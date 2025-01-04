import React, { useRef } from "react";
import "./Slider.css";

const TeamSlider = () => {
  const sliderRef = useRef(null);

  // Horizontal scroll using the touchpad or mouse
  const handleScroll = (event) => {
    if (sliderRef.current) {
      // Prevent default vertical scrolling
      event.preventDefault();

      // Scroll horizontally
      sliderRef.current.scrollLeft += event.deltaY;
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300; // Adjust scroll distance
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300; // Adjust scroll distance
    }
  };

  // Team data
  const teamData = [
    { name: "Alice", title: "CEO", img: "https://via.placeholder.com/300x400" },
    { name: "Bob", title: "CTO", img: "https://via.placeholder.com/300x400" },
    { name: "Clara", title: "CFO", img: "https://via.placeholder.com/300x400" },
    { name: "Dan", title: "CMO", img: "https://via.placeholder.com/300x400" },
    { name: "Eva", title: "COO", img: "https://via.placeholder.com/300x400" },
    { name: "Fred", title: "Engineer", img: "https://via.placeholder.com/300x400" },
    { name: "Grace", title: "Designer", img: "https://via.placeholder.com/300x400" },
    { name: "Hank", title: "Manager", img: "https://via.placeholder.com/300x400" },
    { name: "Ivy", title: "Developer", img: "https://via.placeholder.com/300x400" },
  ];

  return (
    <div className="team-slider">
      <h2 className="text-3xl font-bold text-center mb-6">
        Meet <span className="text-green-500">our</span> team
      </h2>
      
      <div className="flex justify-center">
  <p className="text-center mb-10" >
    Our power of choice is untrammelled and when nothing prevents being able
    to do what we like best every pleasure.
  </p>
</div>

      
      <div className="slider-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>
          &#8249;
        </button>
        <div
          className="slider-container"
          ref={sliderRef}
          onWheel={handleScroll} // Enable horizontal scroll on mouse/touchpad wheel
        >
          {teamData.map((member, index) => (
            <div key={index} className="team-card">
              <div className="card-content">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-lg w-full h-72 object-cover"
                />
                <div className="social-icons">
                  <a href="#" className="icon linkedin">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="icon instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="icon twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
                <div className="card-footer text-center">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm">{member.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>
          
        </button>
      </div>
    </div>
  );s
};

export default TeamSlider;
