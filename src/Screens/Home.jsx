// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./styles.css"; // Import the custom CSS file

import slide1image from "./Assests/Section1.png";

import slide2image from "./Assests/Section 02.png";

import slide3image from "./Assests/services.jpg";
import slide4image from "./Assests/aboutus.jpg";
import feature1 from "./Assests/Pre-02-1536x1322.png";
import feature2 from "./Assests/Decrypt-large-amounts-of-data.png";
import feature3 from "./Assests/Intelligent-Document-Analyser-605x605.png";


function Home() {
  const stats = [
    { value: 73, text: "Front of Style tendencies. It's all in a short and simple, that looks fancy." },
    { value: 73, text: "Front of Style tendencies. It's all in a short and simple, that looks fancy." },
    { value: 73, text: "Front of Style tendencies. It's all in a short and simple, that looks fancy." }
  ];

  const services = [
    { title: "Service 1", description: "Short and sweet contents here. It's all in a short and simple, short note () +" },
    { title: "Service 1", description: "Short and sweet contents here. It's all in a short and simple, short note () +" },
    { title: "Service 1", description: "Short and sweet contents here. It's all in a short and simple, short note () +" }
  ];

  const technologies = [
    { name: 'GitHub', logo: '/api/placeholder/120/40' },
    { name: 'Adobe', logo: '/api/placeholder/120/40' },
    { name: 'Canva', logo: '/api/placeholder/120/40' },
    { name: 'React', logo: '/api/placeholder/120/40' },
    { name: 'Python', logo: '/api/placeholder/120/40' },
    { name: 'JavaScript', logo: '/api/placeholder/120/40' }
  ];

  const features = [
    {
      title: 'Advance Analytics',
      description: 'Gain valuable insights with powerful analytics tools.',
      image: feature1
    },
    {
      title: 'Customisable Dashboard',
      description: 'Tailor your dashboard to display the metrics that matter to you.',
      image: feature2
    },
    {
      title: 'Collaboration Tools',
      description: 'Connect with your team anytime, anywhere, and streamline.',
      image: feature3
    }
  ];
  return (
    <div id="app">
      <section className="relative mx-10 my-10 h-[700px] bg-fixed">
        {/* Slide image */}
        <img
          className="object-cover w-full h-full"
          src={slide1image}
          alt="Section 1 Image"
        />

        {/* Centered Text Layer */}
        <div className="absolute inset-0 flex items-center justify-start mx-20">
          <div className="p-4 text-left bg-transparent   max-w-[600px]">
            <h2 className="mb-4 text-6xl font-extrabold leading-snug tracking-wide">
              Together, we build{" "}
              <span className="text-green-700">impactful</span> tech!
            </h2>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <button className="px-10 py-2 mt-5 text-lg text-white bg-green-600 hover:bg-green-800">
              Explore
            </button>
          </div>
        </div>
      </section>


    {/* section 2 */}

      <section className="relative w-full my-10 bg-zinc-100 ">
        <img
          className="object-cover w-full h-full"
          src={slide2image}
          alt="Section 1 Image"
        />
        <div className="absolute inset-0 flex items-center justify-start p-6 mx-20 ml-20 flex-col-2">
          <div className="w-1/2 p-4 text-left bg-transparent ">
            <h2 className="mb-4 text-6xl font-extrabold leading-snug tracking-wide">
              Engaging{" "}
              <span className="text-green-700">Creative</span>  minds via technology
            </h2>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="text-xl text-black ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </div>
            
          </div>
          
        {/* <div className="absolute inset-0 flex flex-col-2">
          <div className="w-1/2 mt-40 mb-20 ml-10 text-5xl bg-gray-400">
            <div className="absolute p-6 mx-20 ml-20 text-5xl text-left bg-transparent">
              <h1 className="font-extrabold text-black ">
                Engaging{" "}
              
              <span className="text-green-700">
                Creative
              </span>
              
                minds via technology
              </h1>
              </div>

                      <div className="w-1/2 mt-40 mb-20 ml-10 text-5xl bg-yellow-200">

            <div className="absolute text-black text-[25px] font-normal font-['Roboto'] leading-[34.50px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </div>
            <div className="text-xl text-black ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </div>
            </div> */}

            {/* <div className="p-6 ml-20 text-left bg-transparent">
              <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-wide">
                Together, we build{" "}
                <span className="text-green-700">impactful</span> tech!
              </h2>
              <p className="mb-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
              </div> */}
          {/* </div> */}
        </div>
        {/* <div className="flex flex-col-2">
          <div className="w-1/2 mt-40 mb-20 ml-10 bg-gray-400">
            <div className="p-6 ml-20 text-left bg-transparent">
              <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-wide">
                Together, we build{" "}
                <span className="text-green-700">impactful</span> tech!
              </h2>
              <p className="mb-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
              <ul className="justify-items-center">
                <li className="justify-items-center">a</li>
                <li>b</li>
              </ul>
            </div>
          </div>
          <div className="relative w-1/2">
            <div className="object-left ">
              <div className="relative h-1/2"></div> */}
        {/* 
              <img
                className="transform scale-120"
                src={slide2image}
                alt="Section 2 Image"
              ></img> */}
        {/* </div>
          </div>
        </div> */}
        {/* section 3 */}
      </section>
      <section className="px-6 py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
              Long heading is what you see here in this feature section
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-24 h-24 mb-8 mx-auto">
                  {/* Background circle */}
                  <div className="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
                  {/* Progress circle */}
                  <div 
                    className="absolute inset-0 border-8 border-green-500 rounded-full transition-all duration-500 group-hover:border-green-400"
                    style={{ 
                      clipPath: 'polygon(0 0, 73% 0, 73% 100%, 0 100%)',
                    }}
                  ></div>
                  {/* Value */}
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800 group-hover:text-green-500 transition-colors duration-300">
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 text-center">{stat.text}</p>
                <a 
                  href="#" 
                  className="flex items-center justify-center text-green-500 font-semibold group-hover:text-green-600 transition-colors duration-300"
                >
                  <span>Read More</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 md:mb-0">
              Our Services
              <div className="w-24 h-1 bg-green-500 mt-4 rounded-full"></div>
            </h2>
            <button className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Services
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={slide3image}
                    alt={service.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white p-3 rounded-xl shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <img
                      src="/api/placeholder/24/24"
                      alt="Service icon"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-green-500 font-semibold group-hover:text-green-600 transition-colors duration-300"
                  >
                    Learn More
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[500px] w-full">
        <div className="absolute inset-0">
          <img
            src={slide4image}
            alt="Team collaboration"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Medium length section heading goes here
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md transition-colors duration-300">
            Talk to Us
          </button>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-bold mb-12">TECHNOLOGIES</h2>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-12">What We are about</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full overflow-hidden w-48 h-48">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-300">
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
