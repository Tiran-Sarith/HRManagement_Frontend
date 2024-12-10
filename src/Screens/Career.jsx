



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Clock } from 'lucide-react';
import img11 from '../Screens/Assests/gadget-laptop-insurance.webp';
import backgroundImage from '../Screens/Assests/careers.jpg';

// JobCard Component
const JobCard = ({ id, title, location, type, salary }) => (
  <div className="flex items-center justify-between p-4 mb-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
    <div className="flex items-center space-x-4">
      {/* Job Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600">
        <span className="text-xl font-semibold text-white">{title.charAt(0)}</span>
      </div>
      
      {/* Job Details */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-left">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin size={16} className="text-emerald-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} className="text-emerald-600" />
            <span>{type}</span>
          </div>
          <div className="text-gray-600">
            Rs {salary.toLocaleString()}
          </div>
        </div>
      </div>
    </div>

    {/* View Details Button */}
    {/* <button className="px-4 py-2 text-white transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700">
      View Details
    </button> */}
    <Link to={`/career/${id}`} className="px-4 py-2 text-white transition-colors rounded-full bg-emerald-900 hover:bg-emerald-700">
      View Details
    </Link>
  </div>
);

// Pagination Component
const Pagination = () => (
  <div className="flex items-center justify-center mt-8 space-x-2">
    {[1, 2, 3, 4, 5].map((page) => (
      <button
        key={page}
        className={`w-8 h-8 rounded-full flex items-center justify-center
          ${page === 1 
            ? 'bg-emerald-600 text-white' 
            : 'text-gray-600 hover:bg-gray-100'
          }`}
      >
        {page}
      </button>
    ))}
    <span className="px-2">...</span>
    <button className="flex items-center justify-center w-8 h-8 text-gray-600 rounded-full hover:bg-gray-100">
      10
    </button>
  </div>
);

// Jobvacancies Component


const Jobvacancies = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get('http://localhost:8070/vacancies/Vview')
        .then((response) => {
          setJobs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching job vacancies:', error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            id={job._id}
            title={job.jobTitle}
            location="Sri Lanka"
            type={job.hireType}
            salary={job.salary || 150000}
          />
        ))}
      </div>
    );
  };


// const Jobvacancies = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch vacancies from backend API
//   useEffect(() => {
//     axios.get('http://localhost:8070/vacancies/Vview') // Make sure the URL matches your backend route
//       .then((response) => {
//         setJobs(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job vacancies:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl py-8 mx-auto">
//       {/* Job Cards */}
//       <div className="space-y-4">
//         {jobs.map((job, index) => (
//           <JobCard
//             key={index}
//             title={job.jobTitle}
//             location="Sri Lanka" // Assuming all jobs are in Sri Lanka
//             type={job.hireType}
//             salary={150000} // Replace with dynamic salary if available
//           />
//         ))}
//       </div>

//       {/* Pagination */}
//       <Pagination />
//     </div>
//   );
// };

// Career Component
const Career = () => {
  return (
    <div>
      <section>
    <div className="min-h-screen bg-zinc-100" style={{ backgroundImage: `url(${backgroundImage})` }}>

      {/* Hero Section */}
      <div className="relative">
        <div className="px-4 py-12 mx-auto max-w-7xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold">
                Ready to build the next big thing in tech?
              </h1>
              <div className="space-y-4">
                <h2 className="text-2xl font-medium">
                  Life at <span className="text-emerald-600">Itellisense</span> ...
                </h2>
                <p className="text-xl text-gray-700">
                Are you looking for challenging work and international exposure in an informal, fun and creative work environment? 
                Then Intellisense is the place for you. Together, we build great tech!
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Placeholder for the person image */}
              <img 
                src={img11}
                alt="Professional working on laptop"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
</section>
      {/* Job Search Section */}
      <div className='px-4 py-12 mx-auto bg-emerald-100'>
      <div className="max-w-4xl px-4 mx-auto -mt-28">
        <div className="p-6 mb-10 bg-white rounded-lg shadow-lg">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full py-2 pl-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Job Vacancies */}
        <Jobvacancies />
      </div>
    </div>
    </div>
  );
};

export default Career;
