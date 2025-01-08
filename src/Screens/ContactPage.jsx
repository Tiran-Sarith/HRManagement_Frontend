import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.css"; // Include this for any additional styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_0qsjkm8", // Replace with your service ID
        "template_yhd51rq", // Replace with your template ID
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || "N/A",
          topic: formData.topic,
          message: formData.message,
          termsAccepted: formData.termsAccepted ? "Yes" : "No",
        },
        "5FAVnNohYmKg4nXIi" // Replace with your public key
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
          termsAccepted: false,
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("There was an error sending your message. Please try again later.");
      });
  };

  return (
    <div className="contact-container">
      {/* Contact Form and Info */}
      <div className="contact-content">
        <div className="contact-info">
          <h2 style={{ fontSize: "2em" }}>Contact Us</h2>
          <p style={{ marginTop: "20px", marginBottom: "20px" }}>Our friendly team would love to hear from you</p>
          <ul>
            <li>Email: hello@relume.io</li>
            <li>Phone: +1 (555) 000-0000</li>
            <li>Address: 123 Sample St, Sydney NSW 2000 AU</li>
          </ul>
          <h3>Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" /> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" /> Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" /> LinkedIn
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} size="2x" /> YouTube
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <select name="topic" value={formData.topic} onChange={handleChange} required>
              <option value="">Choose a topic</option>
              <option value="Support">Support</option>
              <option value="Sales">Sales</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Type your message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the <a href="#">Terms</a>
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
