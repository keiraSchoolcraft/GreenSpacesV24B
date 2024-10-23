import React, { useState, useEffect, useRef } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ tag, layers, onSelectLayer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Reference to the dropdown menu for click outside detection

    const handleToggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleLayerClick = (layerId) => {
        onSelectLayer(layerId);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    //TODO: find a better place/what to do with this.
    // return (
    //     <div className="custom-dropdown" ref={dropdownRef}>
    //         <button className="dropdown-toggle" onClick={handleToggleDropdown}>
    //             <span className="dropdown-label">{tag}</span>  {/* Display the tag */}
    //             <span className="dropdown-icon">
    //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M7 10l5 5 5-5H7z" fill="#000" />
    //                 </svg>
    //             </span>
    //         </button>
    //         {isOpen && (
    //             <div className="dropdown-menu">
    //                 {layers.map(layer => (
    //                     <div
    //                         key={layer.id}
    //                         className={`dropdown-item ${layer.visible ? 'enabled' : 'disabled'}`}
    //                         onClick={() => handleLayerClick(layer.id)}
    //                     >
    //                         {layer.title}
    //                     </div>
    //                 ))}
    //             </div>
    //         )}
    //     </div>
    // );
};

export default CustomDropdown;
