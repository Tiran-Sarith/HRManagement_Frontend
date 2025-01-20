import React from 'react';
import './ServicesPage.css';
import pic from "../Screens/Assests/Screwdriver-Wrench--Streamline-Flex-Gradient.svg.svg"
import pic2 from "../Screens/Assests/7ca591803ed6de40c20c9748809b14a9.png"
import slide1image from "./Assests/inside-cyberthreats_1745.jpg";

const ServicesPage = () => {
  const services = [
    { id: 1, title: "Service 1", description: "Managed Services" },
    { id: 2, title: "Service 2", description: "Dev Ops, Data Ops, SRE" },
    { id: 3, title: "Service 3", description: "Cloud Services" },
    { id: 4, title: "Service 4", description: "Support & Maintenance " }
  ];

  const reasons = [
    { id: 1, title: "IT experts", description: "Benefit of choosing us 1" },
    { id: 2, title: "24x7x365", description: "Benefit of choosing us 2" },
    { id: 3, title: "IT Partnerships", description: "Benefit of choosing us 3" }
  ];

  const tools = [
    { id: 1, name: "Tool 1", description: "90,000" },
    { id: 2, name: "Tool 2", description: "90,000" },
    { id: 3, name: "Tool 3", description: "90,000" },
    { id: 4, name: "Tool 4", description: "90,000" }
  ];

  const clients = ["Webflow", "Relume", "Webflow", "Relume"];

  return (
    <div className="services-page">
      <div className="relative w-full">
  {/* Image at the Top */}
  <img className="w-full h-[400px] object-cover" src={slide1image} alt="Top Section Image" />
  
  {/* Text Overlay with Semi-Transparent Background */}
  <div className="absolute inset-0 flex flex-col items-center justify-center w-full bg-black bg-opacity-50 p-6">
    {/* First sentence */}
    <p className="text-white text-5xl font-bold whitespace-nowrap shadow-lg">
      Our Services and Expertise
    </p>
    
    {/* Second sentence with smaller font */}
    <p className="text-white text-xl font-semibold mt-2">
      We offer a wide range of solutions to cater to your needs.
    </p>
  </div>
</div>






<section id="services" className="services bg-gray-50 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4 text-black">WHAT WE DO</h2>
    {/* Center-aligned paragraph with max width */}
    <div className="flex justify-center">
      <p className="text-lg text-gray-700 mb-12 max-w-3xl">
        We work with the entire product lifecycle from MVP to product support and maintenance. 
        As one of the pioneers and leaders in Sri Lanka's tech industry, we have a strong brand name 
        and attract the best local talent.
      </p>
    </div>
    {/* Service grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">🔧</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Managed Services</h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">Managed Services</h3>
        <p className="text-gray-600">
          Free up your internal resources to focus on the business by letting us handle day-to-day support services, management, and monitoring of your IT.
        </p>
      </div>
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">🔨</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Dev Ops, Data Ops, SRE</h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">Dev Ops, Data Ops, SRE</h3>
        <p className="text-gray-600">
          DevOps, DataOps, and SRE services to optimize applications, minimize failure risk, increase scalability, and enhance performance.
        </p>
      </div>
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">☁️</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Cloud Services</h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">Cloud Services</h3>
        <p className="text-gray-600">
          Assist in cloud adoption, including cloud-based infrastructure, application migration, optimization, and deployment.
        </p>
      </div>
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">🎧</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Support & Maintenance
        </h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">Support & Maintenance</h3>
        <p className="text-gray-600">
          Provide 24/7 global support and technical maintenance services to meet SLAs and achieve high customer satisfaction.
        </p>
      </div>
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">📊</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Data Engineering & Analytics</h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">Data Engineering & Analytics</h3>
        <p className="text-gray-600">
          Expertise in data architecture and engineering for improved decision-making and cost savings.
        </p>
      </div>
      <div className="service-item bg-white p-6 rounded-lg shadow text-center">
        <div className="icon text-green-500 text-6xl mb-4">🤖</div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">AI and Big Data</h3> {/* New topic */}
        <h3 className="text-xl font-semibold mb-2">AI and Big Data</h3>
        <p className="text-gray-600">
          Create intelligent solutions to extract maximum value from your data using AI, IoT, visualization, and analytics tools.
        </p>
      </div>
    </div>
  </div>
</section>






      {/* Why Choose Us Section */}
<section id="why-choose-intellesenze" className="why-choose-us text-center bg-white py-16">
  <div className="flex flex-col items-center">
    <h2 className="text-4xl font-bold text-black">
      WHY CHOOSE <span className="text-green-500">INTELLESENZE</span>
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl text-center">
      Using deep domain expertise of our software developers, we create impactful digital solutions that drive meaningful change with a strategic vision.
    </p>
  </div>

  <div className="flex justify-center mt-12 gap-10 flex-wrap">
    {reasons.map(reason => (
      <div key={reason.id} className="hexagon bg-gray-300 shadow-lg p-6 flex flex-col items-center">
        <img src={pic2} alt={reason.title} className="w-16 h-16" />
        <h3 className="text-xl font-semibold mt-4 text-black">
          {reason.id === 1 ? (
            <>
              Access to{" "}
              <span className="text-green-500 text-1xl font-bold">IT Experts</span>
            </>
          ) : (
            reason.title
          )}
        </h3>
        <p className="text-gray-700 text-center">{reason.description}</p>
      </div>
    ))}
  </div>
</section>


      {/* Tools & Technologies Section */}
{/* 
<section id="tools-and-tech" className="tools-and-tech">
  <h2 className='mt-10 text-2xl font-bold'>Tools & Technologies Our Software Developers Use</h2>
  <div className="tool-grid">
    {tools.map(tool => (
      <div key={tool.id} className="tool-item">
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
      </div>
    ))}
  </div>
</section> 
*/}

      <section id="clients" className="clients" style={{ backgroundColor: '#f9f9f9', padding: '40px 20px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center' }}>
  <div className="client-stories" style={{ maxWidth: '1200px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ color: '#008000', fontSize: '28px', marginBottom: '10px' }}>Customer Stories</h2>
    <p style={{ color: '#555', fontSize: '16px', marginBottom: '40px', textAlign: 'center', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
      Discover how Creative Software's extended tech teams help clients grow and achieve ambitious goals.
    </p>
    <div className="story-item" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: '60%' }}>
      <div className="story-text" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
        <h3 style={{ color: '#444', fontSize: '24px', marginBottom: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Creating value together</h3>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }}>
          We use an agile development process optimised for distributed development. 
          We work with you to fully understand your requirements. Together, we create 
          and prioritise development tasks based on business values and potential risks. 
          We then move into the development phase, where software is delivered in sprints.
        </p>
      </div>
      <div className="story-image" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
        <img 
          src="/src/Screens/Assests/pikaso_texttoimage_Portrait-of-a-professional-businesswoman-of-Black-.jpeg" 
          alt="Customer Story Image" 
          style={{ width: 'auto', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
        />
      </div>
    </div>
  </div>
</section>








    </div>
  );
};

export default ServicesPage;
