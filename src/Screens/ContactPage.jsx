import  { useState } from "react";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };
    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  //   console.log(formData);
  //   alert("Message sent successfully!");
  // };


//   const handleSubmit = (e) => {
//     e.preventDefault();

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

  const subjects = ["Support", "Sales", "General Inquiry", "Information"];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 mt-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
        {/* Left Section */}
        <div className="bg-gray-900 p-8 rounded-lg text-white">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">
              Contact <span className="text-green-500">Us</span>
            </h1>
            <p className="text-gray-300">Say something to start a live chat!</p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4">
              <Phone className="h-5 w-5 text-white" />
              <span>+94 11 3468 890</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="h-5 w-5 text-white" />
              <span>Intellisense@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-white" />
              <span>132 Down Street Bambalapitiya, Colombo 05 Sri Lanka</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 mt-48 text-left">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                  placeholder="+1 012 3456 789"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Select Subject?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subjects.map((subject, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="subject"
                      value={subject}
                      checked={formData.subject === subject}
                      onChange={handleChange}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 h-32"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 px-6 rounded hover:bg-green-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


// import  { useState } from "react";
// import emailjs from "@emailjs/browser";
// import "./ContactPage.css"; // Include this for any additional styles
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook, faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     topic: "",
//     message: "",
//     termsAccepted: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .send(
//         "service_0qsjkm8", // Replace with your service ID
//         "template_yhd51rq", // Replace with your template ID
//         {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone || "N/A",
//           topic: formData.topic,
//           message: formData.message,
//           termsAccepted: formData.termsAccepted ? "Yes" : "No",
//         },
//         "5FAVnNohYmKg4nXIi" // Replace with your public key
//       )
//       .then((response) => {
//         console.log("SUCCESS!", response.status, response.text);
//         alert("Your message has been sent successfully!");
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           topic: "",
//           message: "",
//           termsAccepted: false,
//         });
//       })
//       .catch((error) => {
//         console.error("FAILED...", error);
//         alert("There was an error sending your message. Please try again later.");
//       });
//   };

//   return (
//     <div className="contact-container">
//       {/* Contact Form and Info */}
//       <div className="contact-content">
//         <div className="contact-info">
//           <h2 style={{ fontSize: "2em" }}>Contact Us</h2>
//           <p style={{ marginTop: "20px", marginBottom: "20px" }}>Our friendly team would love to hear from you</p>
//           <ul>
//             <li>Email: hello@relume.io</li>
//             <li>Phone: +1 (555) 000-0000</li>
//             <li>Address: 123 Sample St, Sydney NSW 2000 AU</li>
//           </ul>
//           <h3>Follow Us</h3>
//           <div className="social-media">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faFacebook} size="2x" /> Facebook
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faInstagram} size="2x" /> Instagram
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faLinkedin} size="2x" /> LinkedIn
//             </a>
//             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faYoutube} size="2x" /> YouTube
//             </a>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="contact-form">
//           <div className="form-group">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last name"
//               value={formData.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone number"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <select name="topic" value={formData.topic} onChange={handleChange} required>
//               <option value="">Choose a topic</option>
//               <option value="Support">Support</option>
//               <option value="Sales">Sales</option>
//               <option value="General Inquiry">General Inquiry</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <textarea
//               name="message"
//               placeholder="Type your message..."
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="termsAccepted"
//                 checked={formData.termsAccepted}
//                 onChange={handleChange}
//               />
//               I accept the <a href="#">Terms</a>
//             </label>
//           </div>

//           <button type="submit" className="submit-btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
