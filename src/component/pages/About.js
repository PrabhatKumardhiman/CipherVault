import React from 'react';

const About = () => {
  return (
    <div className='container mt-5'>
      <h1>About Our Project</h1>
      <p>
        Welcome to our CipherVault! Our goal is to help you securely store and manage your website passwords. 
        Here's how it works:
      </p>
      <h2>How It Works</h2>
      <ol>
        <li>Sign up for an account to get started.</li>
        <li>Once logged in, you can add, update, or delete website passwords in your secure vault.</li>
        <li>Your passwords are encrypted and stored safely in our database.</li>
        <li>Access your passwords anytime and anywhere you need them.</li>
      </ol>
      <h2>Technologies Used</h2>
      <ul>
        <li>React.js for the frontend</li>
        <li>Node.js Express for the backend</li>
        <li>MongoDB as the database</li>
      </ul>
      <h2>Get Started</h2>
      <p>
        Ready to get started? <a href="/signup">Sign up</a> now to start managing your passwords securely!
      </p>
    </div>
  );
};

export default About;
