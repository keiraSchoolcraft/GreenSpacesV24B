import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './LeftSideBar.css'; // Import the CSS file for transitions

const LeftSidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false); // State to control sidebar visibility

    const sidebarData = useSelector(state => state.sidebarData);

    useEffect(() => {
        if (sidebarData != null) {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    }, [sidebarData]);

    return (
        <>
            <CSSTransition
                in={showSidebar}
                timeout={200}
                classNames="sidebar"
                unmountOnExit
            >
                <div className="one-fourth">
                    <h3>Point's Attributes</h3>
                    {sidebarData && (
                        <ul>
                            {Object.entries(sidebarData).map(([key, value], index) => (
                                <li key={index}>
                                    <strong>{key}:</strong> {value || 'N/A'} {/* Display key-value pairs */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </CSSTransition>
        </>
    );
};

export default LeftSidebar;
