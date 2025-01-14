import "./styles.css";

import slide1image from "./Assests/Section1.png";
import slide2image from "./Assests/Section 02.png";
import slide4image from "./Assests/aboutus.jpg";
import feature1 from "./Assests/Pre-02-1536x1322.png";
import feature2 from "./Assests/Decrypt-large-amounts-of-data.png";
import feature3 from "./Assests/Intelligent-Document-Analyser-605x605.png";
import mongodb from "./Assests/Logos/mongodb.jfif";
import express from "./Assests/Logos/express.png";
import react from "./Assests/Logos/react.png";
import node from "./Assests/Logos/node.png";
import tensor from "./Assests/Logos/tensor.png";
import py from "./Assests/Logos/py.png";
import service1 from "./Assests/machine_learning_solutions.jpg";
import service2 from "./Assests/R.jfif";
import service3 from "./Assests/ai.jpg";

function Home() {
  const stats = [
    {
      value: 85,
      text: "Success rate in delivering AI-powered solutions that have measurably improved our clients' business operations",
    },
    {
      value: 90,
      text: "Client satisfaction rate based on our agile development process and responsive support system",
    },
    {
      value: 90,
      text: "On-time project delivery rate through efficient project management and dedicated development teams",
    },
  ];

  const services = [
    {
      title: "Custom ML Solutions",
      description:
        "Tailored machine learning solutions to automate processes, predict trends, and derive actionable insights from your data",
      image: service1,
    },
    {
      title: "MERN Stack Development",
      description:
        "End-to-end web applications using MongoDB, Express.js, React, and Node.js with modern architecture and best practices",
      image: service2,
    },
    {
      title: "AI Integration Services",
      description:
        "Seamless integration of AI capabilities into existing systems to enhance functionality and business intelligence",
      image: service3,
    },
  ];

  const technologies = [
    { name: "MongoDB", logo: mongodb },
    { name: "Express.js", logo: express },
    { name: "React", logo: react },
    { name: "Node.js", logo: node },
    { name: "TensorFlow", logo: tensor },
    { name: "PyTorch", logo: py },
  ];

  const features = [
    {
      title: "AI-Powered Analytics",
      description:
        "Transform your data into actionable insights with our advanced machine learning algorithms and predictive analytics tools.",
      image: feature1,
    },
    {
      title: "Smart Web Solutions",
      description:
        "Modern, scalable web applications built with MERN stack, designed for performance and user experience.",
      image: feature2,
    },
    {
      title: "Innovation Hub",
      description:
        "Leading Sri Lankas tech innovation with cutting-edge AI and web development solutions for global clients.",
      image: feature3,
    },
  ];

  return (
    <div id="app" className="overflow-hidden">
      {/* Section 1 */}
      <section className="relative mx-auto my-4 md:my-0 h-[400px] md:h-[700px] bg-fixed">
        <img
          className="object-cover w-full h-full"
          src={slide1image}
          alt="Section 1 Image"
        />
        <div className="absolute inset-0 flex items-center px-4 md:mx-20 ">
          <div className="p-4 text-left bg-transparent max-w-[100%] md:max-w-[600px]">
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-wide text-left md:text-6xl md:leading-snug">
              Together, we build{" "}
              <span className="text-green-700">impactful</span> tech!
            </h2>
            <p className="mb-4 text-base text-left text-zinc-500 md:text-lg">
              Leading Sri Lanka s digital transformation through innovative
              machine learning solutions and cutting-edge web development. We
              turn your complex challenges into intelligent, scalable solutions.
            </p>
            <button
              className="relative  border-none space-x-2 font-sans font-semibold text-base text-white bg-green-900 py-2 px-8
                  rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:bg-green-800
                  before:content-[''] before:absolute before:top-0 before:w-10 before:h-10 
                  before:bg-white/70 before:transform before:-translate-x-[90px] before:skew-x-[40deg] before:transition-transform 
                  before:duration-[800ms] before:ease-[cubic-bezier(0.97,0.02,0.44,0.99)] hover:before:translate-x-[100px]"
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="relative mt-10 w-full bg-zinc-100">
        <img
          className="object-cover w-full h-[400px] md:h-full"
          src={slide2image}
          alt="Section 2 Image"
        />
        <div className="absolute inset-0 flex items-center px-4  md:px-20">
          <div className="w-full p-4 text-left bg-transparent md:w-1/2">
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-wide text-left md:text-6xl md:leading-snug">
              Engaging <span className="text-green-700">Creative</span> minds
              via technology
            </h2>
            <p className="mb-4 text-base text-left md:text-lg">
              As a dynamic startup in Colombo, we combine local talent with
              global standards to deliver exceptional tech solutions.
            </p>
            <div className="ml-10 space-y-2 text-base text-left text-black md:text-s">
              <ol className="list-disc list-inside">
                <li>
                  Expert team in Machine Learning and MERN stack development
                </li>
                <li>
                  Agile methodology ensuring rapid deployment and iterations
                </li>
                <li>24/7 support and maintenance for all our solutions</li>
              </ol>
            </div>
          </div>
        </div>
      </section>


{/* Stats Section */}
<section className="relative px-6 py-16 mt-10 bg-gradient-to-br from-[#000000] to-[#4d4f4f] text-white">
  {/* Background Glows */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute w-32 h-32 bg-gray-100 rounded-full opacity-25 top-20 left-10 blur-3xl"></div>
    <div className="absolute w-40 h-40 rounded-full bg-stone-200 bottom-10 right-20 opacity-30 blur-2xl"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto">
    {/* Section Title */}
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-4xl font-extrabold text-transparent bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text md:text-5xl">
        Powering Digital Innovation in Sri Lanka
      </h2>
      <div className="w-20 h-1 mx-auto rounded-full bg-emerald-400"></div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative p-8 transition-all duration-500 shadow-lg bg-white/10 backdrop-blur-xl rounded-2xl hover:shadow-2xl hover:scale-105 hover:bg-white/20"
        >
          {/* Circular Progress with Animated Fill */}
          <div className="relative flex items-center justify-center mx-auto mb-8 h-28 w-28">
            <svg className="absolute w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset="0"
                className="text-white opacity-80"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={`${283 - (stat.value / 100) * 283}`}
                strokeLinecap="round"
                className="text-lime-600 transition-all duration-[1200ms] ease-in-out"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-lime-700">
              {stat.value}%
            </span>
          </div>

          {/* Stat Description */}
          <p className="text-center text-gray-300">{stat.text}</p>

          {/* Learn More Button */}
          <a
            href="#"
            className="flex items-center justify-center mt-5 font-semibold text-green-700 transition-all duration-300 hover:text-green-500"
          >
            <span>Learn More</span>
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 transition-all duration-500 bg-gray-400 opacity-0 rounded-2xl blur-xl hover:opacity-10"></div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Services Section */}
      <section className="px-20 py-12 bg-white md:px-26 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row md:mb-16">
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:mb-0 md:text-4xl">
              OUR SERVICES
              <div className="w-24 h-1 mt-4 bg-green-700 rounded-full"></div>
            </h2>
            <button className="px-6 py-2 mt-4 text-base text-white transition-colors duration-300 bg-green-700 md:px-10 md:text-lg hover:bg-green-800">
              Explore
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-48 transition-transform duration-500 md:h-64 hover:scale-105"
                  />
                  {/* <div className="absolute p-3 transition-transform duration-300 transform bg-white shadow-lg top-4 right-4 rounded-xl -rotate-3 hover:rotate-0">
                    <img
                      src="/api/placeholder/24/24"
                      alt="Service icon"
                      className="w-6 h-6"
                    />
                  </div> */}
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="mb-4 text-xl font-bold text-gray-800 md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{service.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center px-5 py-2 text-lg font-semibold text-green-700 transition-colors duration-300 border-2 shadow-inherit rounded-xl hover:text-green-600"
                  >
                    Discover More
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* aboutus Section */}
      <section className="relative h-[300px] md:h-[500px] w-full">
        <div className="absolute inset-0">
          <img
            src={slide4image}
            alt="Team collaboration"
            className="object-cover w-full h-full brightness-50"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl md:mb-6">
            Transform Your Business with AI and MERN
          </h1>
          <p className="max-w-2xl mx-auto mb-6 text-base text-white md:mb-8 md:text-lg">
            Join Sri Lankas leading tech innovators and leverage our expertise
            in machine learning and web development to drive your business
            forward.
          </p>
          <button className="px-4 py-1 text-lg text-white transition-colors duration-300 bg-green-700 md:px-8 md:py-3 hover:bg-green-600">
            About Us
          </button>
        </div>
      </section>

      {/* Technologies Section */}
<section className="px-6 py-12 bg-gray-100 md:py-20">
  <h2 className="mb-10 text-3xl font-extrabold text-center text-gray-800 md:text-4xl">
     TECHNOLOGIES WE USE
  </h2>
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="flex items-center justify-center p-4 transition-transform duration-300 transform bg-white border border-gray-200 rounded-lg shadow-md backdrop-blur-lg hover:scale-105 hover:shadow-xl"
        >
          <img
            src={tech.logo}
            alt={tech.name}
            className="object-contain h-20 md:h-24"
          />
        </div>
      ))}
    </div>
  </div>
</section>

{/* Features Section */}
<section className="px-6 py-12 md:py-20 bg-gradient-to-b from-white to-gray-100">
  <div className="max-w-6xl mx-auto">
    <h2 className="mb-10 text-3xl font-extrabold text-center text-gray-800 md:text-4xl">
      🎯 What We Are About
    </h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 text-center transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="relative w-32 h-32 mb-6 overflow-hidden bg-gray-100 border-gray-400 rounded-full border-1 md:w-40 md:h-40">
            <img
              src={feature.image}
              alt={feature.title}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800 md:text-2xl">
            {feature.title}
          </h3>
          <p className="mb-4 text-gray-600">
            {feature.description}
          </p>
          <button className="px-5 py-2.5 text-lg font-semibold text-white transition-all duration-300 bg-green-700  shadow-md hover:bg-green-600 hover:shadow-xl">
            Try Now 
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}

export default Home;
