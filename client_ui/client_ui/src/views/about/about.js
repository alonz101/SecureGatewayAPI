import './about.css';

import React from 'react';

const About = () => {
    return (
        <div className="about-container">
            <h2>About EventHub</h2>
            <p>
                EventHub is a unified platform designed to provide users with a seamless experience for product listings, chat functionality, and more. Our mission is to connect users and provide them with the tools they need to communicate and discover new products.
            </p>
            <p>
                Built with cutting-edge technologies and a focus on user experience, EventHub is committed to delivering the best possible service to our community.
            </p>
            <h3>Features:</h3>
            <ul>
                <li>Real-time chat functionality</li>
                <li>Extensive product listings</li>
                <li>Serverless backend architecture</li>
                <li>Intuitive user interface</li>
            </ul>
            <p>
                Thank you for choosing EventHub. We hope you enjoy using our platform!
            </p>
        </div>
    );
}

export default About;
