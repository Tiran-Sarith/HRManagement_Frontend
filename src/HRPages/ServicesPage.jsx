import React from 'react';
import './ServicesPage.css';

const ServicesPageHR = () => {
  const services = [
    { id: 1, title: "Service 1", description: "Description for service 1" },
    { id: 2, title: "Service 2", description: "Description for service 2" },
    { id: 3, title: "Service 3", description: "Description for service 3" },
    { id: 4, title: "Service 4", description: "Description for service 4" }
  ];

  const reasons = [
    { id: 1, title: "Reason 1", description: "Benefit of choosing us 1" },
    { id: 2, title: "Reason 2", description: "Benefit of choosing us 2" },
    { id: 3, title: "Reason 3", description: "Benefit of choosing us 3" }
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
      {/* Services Section */}
      <section id="services" className="services">
        <div className="services-header">
          <h2>Software Development Services for Your Innovative Ideas</h2>
          <p>We help our partners accelerate disruption with scalable services and solutions...</p>
        </div>
        <div className="service-grid">
          {services.map(service => (
            <div key={service.id} className="service-item">
              <img src="placeholder.png" alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="reason-grid">
          {reasons.map(reason => (
            <div key={reason.id} className="reason-item">
              <img src="placeholder.png" alt={reason.title} />
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section id="tools-and-tech" className="tools-and-tech">
        <h2>Tools & Technologies Our Software Developers Use</h2>
        <div className="tool-grid">
          {tools.map(tool => (
            <div key={tool.id} className="tool-item">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="clients">
        <h2>Our Clients</h2>
        <div className="client-logos">
          {clients.map((client, index) => (
            <div key={index} className="client-item">
              <img src="placeholder.png" alt={client} />
              <p>{client}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPageHR;
