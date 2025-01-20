import React from "react";
import header1image from "../Screens/Assests/03.jpg";
import women1 from "../Screens/Assests/young-woman-suit-confident-smiling-camera-generated-by-artificial-intelligence.png";
import TeamSlider from "./Slider";
import MissionVision from "./VisionandMission";

export default function About() {
  return (
    <div id="app">
      {/* Header Section */}
      <section className="relative mx-10 my-10 h-[700px] bg-fixed">
        <div className="relative h-full">
          {/* Image */}
          <img
            src={header1image}
            alt="Section 1 Image"
            className="w-full h-full object-cover"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold text-center">
              <span className="block mb-4">We are machine learning</span>
              <span className="block">Engineers</span>
            </h1>
          </div>
        </div>
      </section>

{/* About Section */}
<div className="bg-gray-100 relative max-w-full overflow-hidden py-32">
  {/* Right Image */}
  
  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-3/4 md:w-2/3">
    <img
      src={women1}
      alt="About Us"
      className="w-full h-auto object-cover rounded-lg"
    />
  </div>

  {/* Left Content */}
  <div
    className="relative -ml-20 z-0 bg-white p-10 md:p-16 rounded-lg shadow-lg w-4/5 md:w-3/5 mx-auto md:ml-20"
    style={{
      borderRadius: "0px 60px 0px 60px",
    }}
  >
    <h1 className="text-green-500 text-3xl md:text-5xl font-bold text-left">
      ABOUT INTELLISENSE
    </h1>
    <p className="text-gray-600 text-base md:text-lg mt-6 text-left ">
    Intellisense is a pioneer and leader in Sri Lanka’s software industry with expertise in the rapidly growing and evolving tech ecosystems of Scandinavia and beyond. We specialise in building and managing dedicated, high-performing software development teams with full stack development competencies.
    </p>
  </div>
</div>





      {/* Team Slider */}
      <TeamSlider />

      {/* Mission and Vision */}
      <MissionVision />
    </div>
  );
}

  