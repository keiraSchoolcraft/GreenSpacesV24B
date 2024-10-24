import React from 'react';
import './Contact.css';
import { useNavigate } from 'react-router-dom';
import teamImage from './assets/team.png';
import emma from './assets/Emma.png';
import tristen from './assets/Tristen.png';
import olivia from './assets/Olivia.png';
import keira from './assets/Keira.png';

function Contact() {

    const teamEmail = 'v24b.green@gmail.com';
    const emmaWPI = 'egbustin@wpi.edu';
    const emmaGmail = 'emmacorley893@gmail.com';
    const tristenWPI = 'tedavis@wpi.edu';
    const tristenGmail = 'Tristenezra@gmail.com';
    const oliviaWPI = 'ofustini@wpi.edu';
    const oliviaGmail = 'oliviafustini0331@gmail.com';
    const keiraWPI = 'keschoolcraft@wpi.edu';
    const keiraGmail = 'keira.schoolcraft@gmail.com';

    const mailtoTeam = `https://mail.google.com/mail/?view=cm&fs=1&to=${teamEmail}`;

    const mailtoEmmaWPI = `https://mail.google.com/mail/?view=cm&fs=1&to=${emmaWPI}`;
    const mailtoEmmaGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${emmaGmail}`;

    const mailtoTristenWPI = `https://mail.google.com/mail/?view=cm&fs=1&to=${tristenWPI}`;
    const mailtoTristenGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${tristenGmail}`;

    const mailtoOliviaWPI = `https://mail.google.com/mail/?view=cm&fs=1&to=${oliviaWPI}`;
    const mailtoOliviaGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${oliviaGmail}`;

    const mailtoKeiraWPI = `https://mail.google.com/mail/?view=cm&fs=1&to=${keiraWPI}`;
    const mailtoKeiraGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${keiraGmail}`;

    //const gridItems = Array.from({ length: 36 }, (_, index) => index + 1); // Creates an array of numbers from 1 to 36

    return(
        <div>
            <div className='team'>
                <img src={teamImage} alt='team'/>
                <h2>
                    Green Spaces V24B
                </h2>
                <a href={mailtoTeam} className='email-link'>v24b.green@gmail.com</a>
            </div>
            {/* THis is all the team members' pictures and contact info (indiv.) */}
            <div className='grid-container'>
                {/* <div className='grid-item'>
                    <img src={teamImage} alt="team" className='img'/>
                </div> */}
                <div className='grid-item'>
                    <img src={emma} alt="emma" className='img'/>
                </div>
                <div className='grid-item'>
                    <img src={tristen} alt="tristen" className='img'/>
                </div>
                <div className='grid-item'>
                    <img src={olivia} alt="olivia" className='img'/>
                </div>
                <div className='grid-item'>
                    <img src={keira} alt="keira" className='img'/>
                </div>

                {/*Emma*/}
                <div className='grid-contact'>
                    <h2>
                        Emma Corley-Bustin
                    </h2>
                    <a href={mailtoEmmaWPI} className='email-link'>egbustin@wpi.edu</a>
                    <a href={mailtoEmmaGmail} className='email-link'>eemmacorley893@gmail.com</a>
                    <p>
                        Biomedical Engineering BS   
                    </p>
                    <p>
                        Class of 2026
                    </p>
                </div>
                {/*Tristen*/}
                <div className='grid-contact'>
                    <h2>
                        Tristen Davis
                    </h2>
                    <a href={mailtoTristenWPI} className='email-link'>tedavis@wpi.edu</a>
                    <a href={mailtoTristenGmail} className='email-link'>Tristenezra@gmail.com</a>
                    <p>
                        Physics BA   
                    </p>
                    <p>
                        Class of 2026
                    </p>
                </div>
                {/*Olivia*/}
                <div className='grid-contact'>
                    <h2>
                        Olivia Fustini
                    </h2>
                    <a href={mailtoOliviaWPI} className='email-link'>ofustini@wpi.edu</a>
                    <a href={mailtoOliviaGmail} className='email-link'>oliviafustini0331@gmail.com</a>
                    <p>
                        Civil Engineering BS   
                    </p>
                    <p>
                        Class of 2026
                    </p>
                </div>
                {/*Keira*/}
                <div className='grid-contact'>
                    <h2>
                        Keira Schoolcraft
                    </h2>
                    <a href={mailtoKeiraWPI} className='email-link'>keschoolcraft@wpi.edu</a>
                    <a href={mailtoKeiraGmail} className='email-link'>keira.schoolcraft@gmail.com</a>
                    <p>
                        Computer Science & Robotics Engineering BS   
                    </p>
                    <p>
                        Class of 2026
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Contact;