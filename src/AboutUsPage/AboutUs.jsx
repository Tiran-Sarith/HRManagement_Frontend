import React from 'react';
import header1image from "../Screens/Assests/03.jpg";
import "./aboutus.css";
import women1 from "../Screens/Assests/young-woman-suit-confident-smiling-camera-generated-by-artificial-intelligence.png"


export default function AboutUs() {
    return (
        <div id="app">
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
          <h1 className="text-white text-6xl font-bold" >
            <span style={{marginBottom:'30px'}} className="text-6xl md:text-6xl lg:text-6xl block"> are machine learning </span>
            <span className="text-6xl md:text-6xl lg:text-6xl block">engineering specialists</span>
        </h1>
        </div>
      </div>
      </section>

    <div style={{backgroundColor:'#F1F1F1'}}>
        <div style={{display:'flex', marginLeft:'50px'}}>
            <div style={{backgroundColor:'#FFFFFF', marginBottom:'900px',marginTop:'90px', width:'4000px'}}> 
                <div style={{ marginLeft:'60px' ,marginTop:'40px', textAlign:'left'}}>
            <h1 className="text-green text-5xl font-bold" > About [company name] (include story as a summary) </h1>
                </div>
                <div style={{marginLeft:'60px',marginRight:'20px',marginTop:'30px', textAlign:'left'}}>
                    <p style={{fontSize:'20px'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                    </p>
                </div>
            </div>


            <div >
            <img
          src={women1}
          alt="Section 1 Image"
          style={{width:'4000px', height:'450px'}}
        />
            </div>

        </div>
    </div>
    
      </div>
    );
  }
  