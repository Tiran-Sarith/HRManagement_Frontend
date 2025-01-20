import React from "react";
import Rectangle_3842 from "./Assets/Rectangle_3842.png"; // Ensure the correct path to your uploaded image
import Group7 from "./Assets/Group7.png"; // Replace with the actual path to your icon
import Form from "./form";
import JobDetails from "./JobDetails_apply";

export default function JobApplication() {
  return (
    <div>
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "auto",
      }}
    >
      {/* Image */}
      <img
        src={Rectangle_3842}
        alt="Section 1 Image"
        style={{
          width: "100%",
          height: "auto", // Ensures responsiveness
        }}
      />

      {/* Text Overlay */}
      <h1
        style={{
            position: "absolute",
            top: "50%", // Vertically centered
            left: "30%", // Horizontally centered
            transform: "translate(-50%, -50%)", // Adjusts position to true center
            fontSize: "clamp(20px, 5vw, 40px)", // Responsive font size
            fontWeight: "bold",
            color: "black", // Change text color as needed for contrast
            padding: "10px 20px",
            borderRadius: "8px",
            textAlign: "center",
          }}
          
      >
        Engineer – Cloud Services
      </h1>

    </div>
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginRight:'130px',
        marginLeft:'130px',
        // Adds space between child elements
        }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent:"left",
        height: "100vh",
        
        padding: "20px",
        backgroundColor: "#ffffff", // Adjust background color if needed
      }}
    >
      {/* Icon and Title */}
      <div
        style={{
            marginTop:"40px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <img
          src={Group7}
          alt="Green Icon"
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            margin: 0,
            color: "#000000",
          }}
        >
          Apply Now
        </h1>
      </div>

      {/* Instruction Text */}
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#008000", // Green text
            margin: "10px 0",
            textAlign: 'left',
          }}
        >
          
 
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#666666", // Gray text
            margin: 0,
            textAlign: 'left',
          }}
        >
          <JobDetails/>
        </p>
      </div>
    </div>
      <div style={{
        
      }}>
        <Form/>
      </div>
    </div>
</div>
  );
}
