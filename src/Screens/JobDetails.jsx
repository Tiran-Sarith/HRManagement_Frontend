
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slide1image from "./Assests/banner-5250179_1280.jpg";
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const JobDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Fetch vacancy details using the ID from the URL
    axios.get(`${API_BASE_URL}vacancies/Vview/${id}`)
      .then((response) => {
        setVacancy(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vacancy details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vacancy) {
    return <div>Job not found.</div>; // Handle case where vacancy is not found
  }

  return (
    <div>
      {/* <section className="relative h-[400px]">
        <img
          className="object-cover w-full h-full px-12"
          src={slide1image}
          alt="Section 1 Image"
        />
        <div className="absolute inset-0 flex items-center justify-center mx-20">
          <div className="p-4 text-center bg-transparent max-w-4xl ">
            <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-normal text-white">
              Do the Most Meaningful Work of Your Career

            </h2>
            <h3 className="mb-4 text-center text-lg font-medium text-white">
              At Intellisense, your ideas always matter, and you will be empowered to make things happen. Join us to jump-start your career!            </h3>

          </div>
        </div>



        
      </section> */}

      <section className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full">
        <img
          className="absolute px-12 inset-0 object-cover w-full h-full"
          src={slide1image}
          alt="Section 1 Image"
        />
        <div className="absolute inset-0  flex items-center justify-center px-4">
          <div className="text-center max-w-4xl px-4">
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-normal text-white">
              Do the Most Meaningful Work of Your Career
            </h2>
            <h3 className="mb-4 text-sm sm:text-base md:text-lg font-medium text-white">
              At Intellisense, your ideas always matter, and you will be empowered to make things happen. Join us to jump-start your career!
            </h3>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 py-10 md:px-10 lg:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6  gap-20">
            {/* Job Details Section */}
            <div className="w-full p-6 bg-white rounded-xl shadow-xl">
              <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                {vacancy.jobTitle}
              </h1>

              <div className="space-y-4 text-gray-600 mt-6">
                {[
                  { icon: 'briefcase', label: 'Category', value: vacancy.jobCategory },
                  { icon: 'clipboard', label: 'Type', value: vacancy.hireType },
                  { icon: 'tag', label: 'Department', value: vacancy.department },
                  { icon: 'calendar', label: 'Posted', value: vacancy.postedDate },
                  { icon: 'clock', label: 'Deadline', value: vacancy.deadline },
                  { icon: 'tag', label: 'Designation', value: vacancy.designation }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg 
                      className="w-5 h-5 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {item.icon === 'briefcase' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                      {item.icon === 'clipboard' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      )}
                      {item.icon === 'calendar' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      )}
                      {item.icon === 'clock' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                      {item.icon === 'tag' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z" />
                      )}
                    </svg>
                    <span>{item.label}: {item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center md:text-left">
                <Link
                  to={`/career/${id}/apply`}
                  className="inline-block px-6 py-2 text-lg font-semibold text-white transition-colors bg-green-700 rounded-lg hover:bg-green-800"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="w-full p-6 rounded-lg shadow-xl bg-lime-100">
              <h2 className="flex items-center mb-4 text-lg font-bold">
                BENEFITS
                <span className="ml-2 text-4xl text-green-500">♦</span>
              </h2>
              
              <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
                {vacancy.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg 
                      className="w-5 h-5 mt-1 text-green-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Offer Section */}
            <div className="w-full p-6 rounded-lg shadow-xl bg-lime-100">
              <h2 className="flex items-center mb-4 text-lg font-bold">
                WHAT WE OFFER
                <span className="ml-2 text-4xl text-green-500">♦</span>
              </h2>
              <p className="text-sm leading-loose text-gray-600 text-left">
                {vacancy.whatweoffer}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 px-8 py-8 my-4 mt-5 shadow-xl">
            {/* About Section */}
            <div>
              <h2 className="mb-4 text-lg font-bold">ABOUT THIS POSITION</h2>
              <p className="text-sm leading-loose text-gray-600 text-justify">
                {vacancy.about}
              </p>
            </div>

            {/* Responsibilities Section */}
            <div>
              <h2 className="mb-4 mt-8 text-lg font-bold">RESPONSIBILITIES</h2>
              <ul className="space-y-4 leading-loose">
                {vacancy.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg 
                      className="w-5 h-5 mt-1 text-green-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements Section */}
            <div>
              <h2 className="mb-4 mt-8 text-lg font-bold">REQUIREMENTS</h2>
              <ul className="space-y-4 leading-loose">
                {vacancy.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg 
                      className="w-5 h-5 mt-1 text-green-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div className="text-center">
              <Link
                to={`/career/${id}/apply`}
                className="inline-block px-6 py-2 mt-6 text-lg font-semibold text-white transition-colors bg-green-700 rounded-lg hover:bg-green-800"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

      
    </div>
  );
};

export default JobDetails;
