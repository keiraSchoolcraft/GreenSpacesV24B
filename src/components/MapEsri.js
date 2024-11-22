import React, { useEffect, useRef, useState } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapEsri.css';
// import { updateSidebar } from './actions';
// import store from "./store";
import { useSelector } from "react-redux";
import CustomDropdown from './CustomDropdown'; // Import the CustomDropdown component
import Locate from '@arcgis/core/widgets/Locate';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


const MapEsri = () => {
    const mapRef = useRef(null);
    const mapCenterCoordinates = useSelector(state => state.centerMap);
    const viewRef = useRef(null);  // Reference to store the view instance
    const [taggedLayers, setTaggedLayers] = useState({});  // State for layers grouped by tags
    const accessDropdown = document.getElementById('accessDropdown');
    const filterButton = document.getElementById('filterButton');


    useEffect(() => {
        const initializeMap = async () => {
            // Create a new WebMap instance
            const webMap = new WebMap({
                portalItem: {
                    id: '2ebcd195f91a4e318a521829a70ba01b' // Replace with your WebMap ID
                }
            });

            const popupTemplate = {
                title: "{name}", // This will display the title field from the clicked feature
                //title: "Green Space",
                content: [{
                  type: "text",
                  text: `
                    <b>Access:</b> {access} <br>
                    <b>Condition:</b> {condition} <br>
                    <b>Type:</b> {landuse} <br>
                  `
                }]
            };

            const giudecca_green = new FeatureLayer({
                portalItem: {
                  id: "2bae2e4654f541deb17e69fba5063368", // Replace with the actual portal item ID
                },
                outFields: ["*"], // Ensure all attributes are available
                popupTemplate: popupTemplate
            });
            webMap.add(giudecca_green);

            // Create a new MapView instance
            const view = new MapView({
                container: mapRef.current,
                center: [mapCenterCoordinates[0], mapCenterCoordinates[1]],
                zoom: mapCenterCoordinates[2],
                map: webMap,
                popupEnabled: true
            });
            

            // Store the view instance in the ref
            viewRef.current = view;

            view.popupEnabled = true; // Ensure popups are enabled globally
            let highlight; // Keep a reference to the highlighted feature

            
            view.on("click", (event) => {

                // Perform a hitTest to detect if a feature was clicked
                view.hitTest(event).then((hitTestResults) => {
                    console.log("Hit test results:", hitTestResults); // Debugging: Log hitTest results

                    if (highlight) {
                        highlight.remove();
                        highlight = null;
                      }
                  // Find the clicked graphic from the 'giudecca_green' layer
                  const graphic = hitTestResults.results.find(
                    (result) => result.graphic && result.graphic.layer === giudecca_green
                  )?.graphic;
              
                  if (graphic) {
                    console.log("Feature clicked:", graphic.attributes); // Debugging: Log the clicked feature
                    // Open the popup with a simple message

                    view.openPopup({
                        title: graphic.attributes.name,
                        // title: "Green Space", // Title from the clicked feature
                        content: `
                          <b>Access:</b> ${graphic.attributes.access} <br>
                          <b>Condition:</b> ${graphic.attributes.condition} <br>
                          <b>Type:</b> ${graphic.attributes.landuse} <br>
                        `,
                        location: event.mapPoint, // Position the popup at the click location
                    });
                  } else {
                    // Close the popup if no polygon is clicked
                    view.popup.close();
                  }
                });
              });



            // Wait for webMap to be fully loaded
            await webMap.when();

            // const applyFilter = () => {
            //     if (!accessDropdown.current) return; // Guard clause
          
            //     const selectedAccess = accessDropdown.current.value;
            //     let whereClause = "1=1"; // Default to "all" which shows everything
          
            //     if (selectedAccess === "full") {
            //         whereClause = "access = 'Full'";
            //     } else if (selectedAccess === "semi") {
            //         whereClause = "access = 'Limited'";
            //     } else if (selectedAccess === "none") {
            //         whereClause = "access = 'None'";
            //     }
          
            //     // Apply the filter to the feature layer
            //     giudecca_green.definitionExpression = whereClause;
            //     console.log(`Filter applied: ${whereClause}`);
          
            //     giudecca_green.refresh(); // Refresh the layer to apply the filter
            //   };
          
            //   // Attach the filter function to the dropdown's onChange event
            //   if (accessDropdown.current) {
            //     accessDropdown.current.addEventListener("change", applyFilter);
            //   }
          
            //   // Cleanup event listener on component unmount
            //   return () => {
            //     if (accessDropdown.current) {
            //       accessDropdown.current.removeEventListener("change", applyFilter);
            //     }
            // };

            filterButton.addEventListener('click', () => {
                const selectedAccess = accessDropdown.value;
            
                let whereClause = "1=1"; // Default to "all" which shows everything
            
                // Update the where clause based on the selected access level
                if (selectedAccess === "full") {
                    whereClause = "access = 'Full'";
                } else if (selectedAccess === "semi") {
                    whereClause = "access = 'Limited'";
                } else if (selectedAccess === "none") {
                    whereClause = "access = 'None'";
                }
            
                // Apply the filter to the feature layer
                giudecca_green.definitionExpression = whereClause;
                console.log(`Filter applied: ${whereClause}`);
            
                // You can refresh the layer or map view if needed
                giudecca_green.refresh();
            });

            const layersByTag = {};

            // Add Locate widget
            const locateWidget = new Locate({
                view: view,
                useHeadingEnabled: false,
                goToOverride: (view, options) => {
                options.target.scale = 1500; // Adjust zoom scale
                return view.goTo(options.target);
                },
            });
            view.ui.add(locateWidget, 'top-left');

            // Process each layer
            for (const layer of webMap.layers) {
                const portalItem = layer.portalItem;

                // Wait for the portalItem to be fully loaded
                await portalItem.load();

                // Safeguard the access to tags
                const tags = (portalItem.tags && portalItem.tags.length > 0) ? portalItem.tags : ['unknown'];

                // Handle cases where tags might be an empty string or contain empty arrays
                const validTags = tags.length > 0 && tags[0] !== '' ? tags : ['unknown'];

                validTags.forEach(tag => {
                    if (!layersByTag[tag]) {
                        layersByTag[tag] = [];
                    }
                    layersByTag[tag].push({
                        title: layer.title,
                        id: layer.id,
                        visible: layer.visible
                    });
                });
            }

            setTaggedLayers(layersByTag);
        };

        initializeMap();

        return () => {
            // Cleanup view
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, [mapCenterCoordinates, accessDropdown, filterButton]);

    // Handle layer visibility toggle
    const toggleLayerVisibility = (layerId) => {
        setTaggedLayers(prevLayers => {
            const updatedLayers = { ...prevLayers };
            for (let tag in updatedLayers) {
                updatedLayers[tag] = updatedLayers[tag].map(layer =>
                    layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
                );
            }
            return updatedLayers;
        });

        const view = viewRef.current;
        if (view) {
            const layerToToggle = view.map.findLayerById(layerId);
            if (layerToToggle) {
                layerToToggle.visible = !layerToToggle.visible;
            }
        }
    };

    return (
        <div className="map-container">
            <div className="mapbox" ref={mapRef}>
                <div className='style-dropdown'>
                <div>
                    <select id="accessDropdown">
                        <option value="all">All</option>
                        <option value="full">Public</option>
                        <option value="semi">Semi-Public</option>
                        <option value="none">Private</option>
                    </select>
                    <button id="filterButton">Apply</button>
                    </div>
                    {/* <p> Filter </p> */}
                    {Object.keys(taggedLayers).map(tag => (
                        <CustomDropdown
                            key={tag}
                            tag={tag}
                            layers={taggedLayers[tag]}
                            onSelectLayer={toggleLayerVisibility}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapEsri;
