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
    { id: 2, title: "24 x7 x365", description: "Benefit of choosing us 2" },
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
      <section id="why-choose-intellesenze" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              WHY CHOOSE <span className="text-green-600">INTELLESENZE</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Leveraging deep domain expertise, we craft impactful digital solutions that drive meaningful change with a strategic vision and innovative approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <div
                key={reason.id}
                className="group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute -inset-0.5 bg-gray-400 rounded-2xl opacity-75 group-hover:opacity-100 blur-xl transition duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-8 text-center h-full flex flex-col items-center">
                  <div className="mb-4 w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <img
                      src={pic2}
                      alt={reason.title}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {reason.id === 1 ? (
                      <>
                        Access to{" "}
                        <span className="text-green-600">IT Experts</span>
                      </>
                    ) : (
                      reason.title
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {reason.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-green-600 font-semibold hover:underline cursor-pointer">
                      Learn More →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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




      <section
        id="clients"
        className="clients bg-[#f9f9f9] py-10 px-4 flex justify-center font-sans"
      >
        <div className="client-stories max-w-6xl text-center flex flex-col items-center w-full">
          <h2 className="text-green-600 text-2xl md:text-3xl lg:text-4xl mb-4">
            Customer Stories
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-10 text-center max-w-4xl px-4">
            Discover how Creative Software's extended tech teams help clients grow and achieve ambitious goals.
          </p>

          <div className="story-item flex flex-col md:flex-row items-stretch bg-white rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 p-6 md:p-8 space-y-6 md:space-y-0 md:space-x-6">
            <div className="story-text flex-1 flex flex-col justify-center text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-4 font-bold">
                Creating value together
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We use an agile development process optimised for distributed development.
                We work with you to fully understand your requirements. Together, we create
                and prioritise development tasks based on business values and potential risks.
                We then move into the development phase, where software is delivered in sprints.
              </p>
            </div>

            <div className="story-image flex-1 flex justify-center md:justify-end items-center">
              <img
                src="/src/Screens/Assests/pikaso_texttoimage_Portrait-of-a-professional-businesswoman-of-Black-.jpeg"
                alt="Customer Story Image"
                className="w-full md:w-auto h-64 md:h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
