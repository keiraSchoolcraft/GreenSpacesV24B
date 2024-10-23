import React, { useEffect, useRef, useState } from 'react';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import '@arcgis/core/assets/esri/themes/light/main.css';
import './MapEsri.css';
import { updateSidebar } from './actions';
import store from "./store";
import { useSelector } from "react-redux";
import CustomDropdown from './CustomDropdown'; // Import the CustomDropdown component

const MapEsri = () => {
    const mapRef = useRef(null);
    const mapCenterCoordinates = useSelector(state => state.centerMap);
    const viewRef = useRef(null);  // Reference to store the view instance
    const [taggedLayers, setTaggedLayers] = useState({});  // State for layers grouped by tags

    useEffect(() => {
        const initializeMap = async () => {
            // Create a new WebMap instance
            const webMap = new WebMap({
                portalItem: {
                    id: '576d52c0fd554ab190e356830de6d713' // Replace with your WebMap ID
                }
            });

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

            // Handle the click and pop up here!
            view.on("click", function (event) {
                view.hitTest(event).then(function (hitTestResults) {
                    try {
                        view.popup.watch("selectedFeature", (feature) => {
                            store.dispatch(updateSidebar(feature?.attributes));
                        });
                    } catch {
                        store.dispatch(updateSidebar(null));
                    }
                });
            });

            // Wait for webMap to be fully loaded
            await webMap.when();

            const layersByTag = {};

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
    }, [mapCenterCoordinates]);

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
            {Object.keys(taggedLayers).map(tag => (
                <CustomDropdown
                    key={tag}
                    tag={tag}
                    layers={taggedLayers[tag]}
                    onSelectLayer={toggleLayerVisibility}
                />
            ))}
            <div className="mapbox" ref={mapRef}></div>
        </div>
    );
};

export default MapEsri;
