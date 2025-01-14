// //JobDetails.jsx
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const JobDetails = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`http://localhost:8070/vacancies/Vview/:id`)
//       .then((response) => {
//         setJob(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job details:', error);
//         setLoading(false);
//       });
//   }, [jobId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!job) {
//     return <div>Job not found.</div>;
//   }

//   return (
//     <div>
//         <section>
//         <div className="w-full bg-white h-2/6">
        
//         </div>
//         </section>
//         <section>
//     <div className="max-w-4xl py-8 mx-auto bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-emerald-600">{job.jobTitle}</h1>
//       <p className="mb-4 text-gray-600">{job.description}</p>
//       <div className="space-y-2">
//         <div><strong>Location:</strong> {job.location || 'Sri Lanka'}</div>
//         <div><strong>Type:</strong> {job.hireType}</div>
//         <div><strong>Salary:</strong> Rs {job.salary ? job.salary.toLocaleString() : '150,000'}</div>
//         <div><strong>Requirements:</strong> {job.requirements || 'Not specified'}</div>
//         <div><strong>Responsibilities:</strong> {job.responsibilities || 'Not specified'}</div>
//       </div>
//     </div>
//     </section>
//     </div>
//   );
// };

// export default JobDetails;



import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slide1image from "./Assests/banner-5250179_1280.jpg";

const JobDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch vacancy details using the ID from the URL
    axios.get(`http://localhost:8070/vacancies/Vview/${id}`)
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
      <section className="relative h-[400px]">
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
      </section>
      {/* <h1>{vacancy.jobTitle}</h1>
      <p>{vacancy.jobDescription}</p>
      <p>Category: {vacancy.jobCategory}</p>
      <p>Hire Type: {vacancy.hireType}</p>
      <p>Posted Date: {new Date(vacancy.postedDate).toLocaleDateString()}</p> */}
      <div className="p-6 -mt-5 text-left bg-white w-fit mx-28 ">
      {/* Left Column */}
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 ">
        <div className="space-y-6">
          {/* Job Details Section */}
          <div className="w-4/5 px-8 py-8  rounded-xl my-4 mb-8 shadow-xl">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">{vacancy.jobTitle}</h1>
            
            {/* <div className="space-y-2 text-sm text-gray-600">
              <div>Category:{vacancy.jobCategory}</div>
              <div>Job ID: Job ID</div>
              <div>Hire Type: {vacancy.hireType}</div>
              <div>Job posted: {new Date(vacancy.postedDate).toLocaleDateString()}</div>
              <div>Deadline: 2025-03-20</div>
            </div> */}


            <div className="space-y-4 text-gray-600 mt-8">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Category: {vacancy.jobCategory}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Type: {vacancy.hireType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Posted: {new Date(vacancy.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Deadline: {vacancy.deadline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Designation: {vacancy.designation}</span>
                </div>
              </div>

            <a href="/apply" target="_blank" rel="noopener noreferrer">
              <button className="w-full mt-5 px-6 py-2 text-lg font-semibold text-white transition-colors bg-green-700 rounded-lg hover:bg-green-800">
                Apply Now
              </button>
            </a>
          </div>

          {/* Benefits Section */}
          <div className="w-4/5 p-6 mb-20 rounded-lg shadow-xl bg-lime-100">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              BENEFITS
              <span className="ml-2 text-4xl text-green-500">♦</span>
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
            <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">US dollar-linked compensation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Performance-based annual bonus</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Comprehensive Health & Life Insurance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Hybrid work arrangement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Performance matrix-based recognition</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Special allowances for Health, Wellness & Academic</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Paid birthday leave</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Team engagement allowance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Comprehensive Health & Life Insurance Cover</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Overseas travel opportunities.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Exposure to client environments.</span>
                </li>


              
            </ul>
          </div>

          {/* What We Offer Section */}
          <div className="w-4/5 p-6 mt-20 rounded-lg shadow-xl bg-lime-100">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              WHAT WE OFFER
              <span className="ml-2 text-4xl text-green-500">♦</span>
            </h2>
            <p className="text-sm leading-loose text-gray-600 text-left">
              Our careers offer a flexible working environment, attractive remuneration, and 
              a place to grow and flourish. You will be amongst peers at the top of their game, 
              allowing you to sharpen your skills in an inclusive culture. We offer a variety of 
              spaces that support their work-life balance and integrate wellness into our 
              workplace experience, which includes a relaxation zone and gaming area.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="px-8 py-8 my-4 mt-5 space-y-6 shadow-xl">
          {/* About Section */}
          <div>
            <h2 className="mb-4 text-lg font-bold">ABOUT THIS POSITION</h2>
            <p className="text-sm leading-loose text-gray-600">
              {vacancy.about}
              {/* We are currently on the lookout for a competent, self-motivated Engineer – 
              Cloud Services for our Cloud Services team with a solid understanding of 
              Linux, GCP/AWS Cloud and Azure to collaborate, lead change, automate 
              and inspire teams towards delivery excellence at Intelligence. */}
            </p>
          </div>

          {/* Responsibilities Section */}
          <div>
            <h2 className="mb-4 mt-16 text-lg font-bold">RESPONSIBILITIES</h2>
            
            <ul className="space-y-4 leading-loose">
                  {vacancy.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
          </div>

          {/* Requirements Section */}
          <div>
            <h2 className="mb-4 mt-16 text-lg font-bold">REQUIREMENTS</h2>
            

              <ul className="space-y-4 leading-loose">
                  {vacancy.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 mt-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                
              {/* <li>• A Bachelor's Degree in Computer Science or equivalent</li>
              <li>• Certifications on Google Cloud/Amazon Web Services (AWS) and a solid 
                understanding of their services</li>
              <li>• Certifications on Linux based Systems and 1 to 3 years of proven 
                experience as a Linux administrator</li>
              <li>• Development skills, including the ability to work successfully in an 
                Agile, fast-paced environment</li>
              <li>• The ability to utilize scripting languages such as Ansible, Python, Bash 
                and PowerShell</li>
              <li>• Excellent knowledge of networking and containerization</li>
              <li>• Knowledge on middle-tier applications including all web servers such as 
                Apache, Nginx, RabbitMQ, Redis, and Mem-cache will be an added 
                advantage</li>
              <li>• Strong oral, written, and presentation abilities, able to convey risk to all 
                levels of the business, from executives to operations and development 
                teams</li>
              <li>• Certifications in the areas of Azure, GCP, AWS, Linux, or Networking will 
                be an added advantage</li> */}
            </ul>
          </div>

          {/* Apply Button */}
          <div className="flex justify-center mt-8">
          <a href="/apply" target="_blank" rel="noopener noreferrer">
              <button className="w-full mt-5 px-12 py-2 text-lg font-semibold text-white transition-colors bg-green-700 rounded-lg hover:bg-green-800">
                Apply Now
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobDetails;
