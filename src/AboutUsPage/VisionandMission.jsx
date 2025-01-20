import React from "react";
import Rectangle1 from "../assets/Rectangle1.png"; // Correct the path if necessary

const MissionCard = () => {
  return (
    <div
      className="bg-green-50 min-h-screen flex justify-center items-center px-4 gap-8"
      style={{
        backgroundImage: `url(${Rectangle1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        
      }}
    >
      <div className="max-w-4xl bg-white rounded-xl shadow-md p-8 relative text-center">
        {/* Header Section */}
        <div>
          <div className="mb-4">
            <span className="text-yellow-400 text-xl">★ ★ ★ ★ ★</span>
          </div>
          <h2 className="text-3xl font-bold">
            Our <span className="text-green-500">Mission</span>
          </h2>
        </div>

        {/* Testimonial Section */}
        <div className="my-8">
          <p className="text-gray-600 text-lg italic">
            "A customer testimonial that highlights features and answers
            potential customer doubts about your product or service. Showcase
            testimonials from a similar demographic to your customers."
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-8 px-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h4 className="font-bold text-gray-800">Name</h4>
              <p className="text-gray-500">Post</p>
            </div>
          </div>

          {/* Logo */}
          <img
            src="https://via.placeholder.com/100x30"
            alt="Webflow Logo"
            className="h-8"
          />
        </div>
      </div>
      <div className="max-w-4xl bg-white rounded-xl shadow-md p-8 relative text-center">
        {/* Header Section */}
        <div>
          <div className="mb-4">
            <span className="text-yellow-400 text-xl">★ ★ ★ ★ ★</span>
          </div>
          <h2 className="text-3xl font-bold">
            Our <span className="text-green-500">Vission</span>
          </h2>
        </div>

        {/* Testimonial Section */}
        <div className="my-8">
          <p className="text-gray-600 text-lg italic">
            "A customer testimonial that highlights features and answers
            potential customer doubts about your product or service. Showcase
            testimonials from a similar demographic to your customers."
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-8 px-4">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <h4 className="font-bold text-gray-800">Name</h4>
              <p className="text-gray-500">Post</p>
            </div>
          </div>

          {/* Logo */}
          <img
            src="https://via.placeholder.com/100x30"
            alt="Webflow Logo"
            className="h-8"
          />
        </div>
      </div>

      
    </div>
  );
};

export default MissionCard;
