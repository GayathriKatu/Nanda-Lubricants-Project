// HomePage.js
import React from 'react';
import './home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <header className="ribbon">

      </header>
      <div className="company-info">
          <h2>NANDA LUBRICANT <br></br>DISTRIBUTORS PVT LTD</h2>
        </div>
        <div className="welcome-message">
       <p>WELCOME TO OUR COMPANY</p>
       </div>
       <div className="details-container">
    <div className="detail-set">
      <h3>OUR VALUES</h3>
      <p>At Nanda Distributors, our commitment<br></br>
        to innovation, integrity, and efficiency drives<br></br>
        us. We prioritize customer satisfaction<br></br>
        and collaboration, fostering strong <br></br>
        partnerships for mutual success.</p>
    </div>
    <div className="detail-set">
      <h3>OUR VISION</h3>
      <p>Empowering Distribution Excellence</p>
    </div>
    <div className="detail-set">
      <h3>COMPATIBILITY</h3>
      <p>In our pursuit of distribution excellence, <br></br>
        our web-based system harmonizes seamlessly <br></br>
        with Laughs Lubricants, ensuring asynchronized <br></br>
        and efficient distribution network.
</p>
    </div>
  </div>
        
      {/* Add any additional content for the home page */}
    </div>
  );
}

export default Home;
