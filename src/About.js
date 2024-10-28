import React from 'react';
import './About.css'
import park from './assets/venice-park.jpg';

function About() {


    return(

        <div className='about'>
            <div className='image-container'>
                <img src={park} alt="venice-park" className="transparent-image" />
                <div className="image-overlay"></div>
                <h1 className='overlay-text'>About Us</h1>
            </div>
            <div className='grid-container-a'>
                <div className='grid-item-a'>
                    <h2>
                        Mission Statement
                    </h2>
                    <p>
                        This project continues and finalizes research on green spaces in Venice, specifically in Dorsoduro and San Marco sestieri.
                    </p>
                </div>
                <div className='grid-item-a'>
                    <h2>
                        Project Objectives
                    </h2>
                    <ol>
                        <li>To catalog and assess existing green spaces in San Marco and Dorsoduro.</li>
                        <li>To combine and integrate previous green space findings.</li>
                        <li>To evaluate the reachability of green spaces from each island.</li>
                        <li>To identify green spaces to be made available to the public.</li>
                        <li>To make all Venice green space data publicly available.</li>
                    </ol>
                </div>
                <div className='grid-item-a'>
                    <h2>
                        Our Goal
                    </h2>
                    <p>
                        We hope to provide the public with a comprehensive list of all green spaces in Venice, their location, their features, and their quality.<br/>
                        We aim to give the public, the city, and any organizations the tools to determine how lacking of green space Venice is, and what the best targets to combat this would be.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;