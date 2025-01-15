

      import { useState, useEffect } from 'react';
      import { Link } from 'react-router-dom';
      import axios from 'axios';
      import { Search, MapPin, Clock, Briefcase } from 'lucide-react';
      import img11 from '../Screens/Assests/gadget-laptop-insurance.webp';
      import backgroundImage from '../Screens/Assests/careers.jpg';
      
      // Enhanced JobCard Component with modern design
      const JobCard = ({ id, title, location, type }) => (
        <div className="group flex items-center justify-between p-6 mb-6 transition-all duration-300 bg-white rounded-xl shadow-sm hover:shadow-lg hover:transform hover:scale-[1.02]">
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-16 h-16 transition-colors rounded-xl bg-emerald-50 group-hover:bg-emerald-100">
              <Briefcase size={24} className="text-emerald-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-left text-gray-900">{title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-left text-gray-600">
                <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-gray-50">
                  <MapPin size={14} className="text-emerald-600" />
                  <span className="text-gray-700">{location}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-gray-50">
                  <Clock size={14} className="text-emerald-600" />
                  <span className="text-gray-700">{type}</span>
                </div>
              </div>
            </div>
          </div>
      
          <Link 
            to={`/career/${id}`} 
            className="px-6 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-emerald-600 hover:bg-emerald-700 hover:shadow-md"
          >
            View Position
          </Link>
        </div>
      );
      
      // Enhanced Jobvacancies Component
      const Jobvacancies = ({ searchQuery }) => {
        const [jobs, setJobs] = useState([]);
        const [loading, setLoading] = useState(true);
        const [filteredJobs, setFilteredJobs] = useState([]);
      
        useEffect(() => {
          axios.get('http://localhost:8070/vacancies/Vview')
            .then((response) => {
              setJobs(response.data);
              setFilteredJobs(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching job vacancies:', error);
              setLoading(false);
            });
        }, []);
      
        useEffect(() => {
          if (searchQuery.trim() === '') {
            setFilteredJobs(jobs);
          } else {
            const filtered = jobs.filter((job) => 
              job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.hireType.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
          }
        }, [searchQuery, jobs]);
      
        if (loading) {
          return (
            <div className="flex items-center justify-center py-12">
              <div className="space-y-3 text-center">
                <div className="w-16 h-16 mx-auto border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading opportunities...</p>
              </div>
            </div>
          );
        }
      
        if (filteredJobs.length === 0) {
          return (
            <div className="p-12 text-center bg-white rounded-xl">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-emerald-600">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No Matching Positions</h3>
                <p className="text-gray-600">
                  We couldn't find any positions matching your search criteria. Try adjusting your search terms.
                </p>
              </div>
            </div>
          );
        }
      
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">Open Positions</h2>
              <span className="px-4 py-2 text-sm text-emerald-700 bg-emerald-50 rounded-full">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Position' : 'Positions'} Available
              </span>
            </div>
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.jobTitle}
                location="Sri Lanka"
                type={job.hireType}
              />
            ))}
          </div>
        );
      };
      
      // Enhanced Career Component
      // const Career = () => {
      //   const [searchQuery, setSearchQuery] = useState('');
      
      //   return (
      //     <div className="min-h-screen bg-gray-50">
      //       {/* Hero Section */}

      //       <section>
      //   <div className="min-h-screen bg-zinc-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
      //     <div className="relative">
      //       <div className="px-4 py-12 mx-auto max-w-7xl">
      //         <div className="grid items-center gap-8 md:grid-cols-2">
      //           <div className="space-y-6">
      //             <h1 className="text-6xl font-bold">
      //               Ready to build the next big thing in tech?
      //             </h1>
      //             <div className="space-y-4">
      //               <h2 className="text-2xl font-medium">
      //                 Life at <span className="text-emerald-600">Itellisense</span> ...
      //               </h2>
      //               <p className="text-xl text-gray-700">
      //                 Are you looking for challenging work and international exposure in an informal, fun and creative work environment? 
      //                 Then Intellisense is the place for you. Together, we build great tech!
      //               </p>
      //             </div>
      //           </div>
      //           <div className="hidden md:block">
      //             <img 
      //               src={img11}
      //               alt="Professional working on laptop"
      //               className="rounded-lg"
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </section>


            {/* <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 to-emerald-800">
              <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              
              <div className="relative px-4 py-20 mx-auto max-w-7xl">
                <div className="grid items-center gap-12 md:grid-cols-2">
                  <div className="space-y-8">
                    <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl">
                      Build the Future with Us
                    </h1>
                    <div className="space-y-6">
                      <h2 className="text-2xl font-medium text-emerald-200">
                        Life at <span className="text-white">Intellisense</span>
                      </h2>
                      <p className="text-lg text-emerald-100">
                        Join our team of innovators and problem-solvers. We offer challenging work, 
                        international exposure, and a creative environment where great ideas thrive.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img 
                      src={img11}
                      alt="Professional working on laptop"
                      className="rounded-2xl shadow-2xl height-96"
                    />
                  </div>
                </div>
              </div>
            </section> */}
      
            {/* Search and Jobs Section */}
      //       <div className="px-4 py-16 ">
      //         <div className="max-w-5xl mx-auto -mt-32">
      //           {/* Search Box */}
      //           <div className="p-8 transition-shadow  bg-white rounded-2xl shadow-xl hover:shadow-2xl">
      //             <div className="relative">
      //               <input
      //                 type="text"
      //                 placeholder="Search for your dream role..."
      //                 value={searchQuery}
      //                 onChange={(e) => setSearchQuery(e.target.value)}
      //                 className="w-full py-4 pl-6 pr-12 text-lg transition-all border-2 rounded-xl border-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
      //               />
      //               <Search className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2" size={24} />
      //             </div>
      //           </div>
      
      //           {/* Job Listings */}
      //           <div className="mt-12">
      //             <Jobvacancies searchQuery={searchQuery} />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // };
      
      // export default Career;


      const Career = () => {
        const [searchQuery, setSearchQuery] = useState('');
      
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Relative Positioning */}
            <section className="relative">
              <div className="min-h-[80vh] bg-zinc-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
      
              {/* Overlapping Search Box */}
              <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="p-8 transition-shadow bg-white rounded-2xl shadow-xl hover:shadow-2xl">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for your dream role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-4 pl-6 pr-12 text-lg transition-all border-2 rounded-xl border-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                      />
                      <Search className="absolute text-gray-400 transform -translate-y-1/2 right-4 top-1/2" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
            {/* Job Listings Section - Adjusted spacing to account for overlapping search box */}
            <div className="px-4 pt-32 pb-16">
              <div className="max-w-5xl mx-auto">
                <Jobvacancies searchQuery={searchQuery} />
              </div>
            </div>
          </div>
        );
      };
      
      export default Career;



















// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Search, MapPin, Clock } from 'lucide-react';
// import img11 from '../Screens/Assests/gadget-laptop-insurance.webp';
// import backgroundImage from '../Screens/Assests/careers.jpg';




// // JobCard Component remains the same
// const JobCard = ({ id, title, location, type }) => (
//   <div className="flex items-center justify-between p-4 mb-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
//     <div className="flex items-center space-x-4">
//       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600">
//         <span className="text-xl font-semibold text-white">{title.charAt(0)}</span>
//       </div>
      
//       <div className="space-y-1">
//         <h3 className="text-lg font-semibold text-left">{title}</h3>
//         <div className="flex items-center space-x-4 text-sm text-gray-600">
//           <div className="flex items-center space-x-1">
//             <MapPin size={16} className="text-emerald-600" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Clock size={16} className="text-emerald-600" />
//             <span>{type}</span>
//           </div>
//         </div>
//       </div>
//     </div>

//     <Link to={`/career/${id}`} className="px-4 py-2 text-white transition-colors rounded-full bg-emerald-900 hover:bg-emerald-700">
//       View Details
//     </Link>
//   </div>
// );

// // Updated Jobvacancies Component with search functionality
// const Jobvacancies = ({ searchQuery }) => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8070/vacancies/Vview')
//       .then((response) => {
//         setJobs(response.data);
//         setFilteredJobs(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching job vacancies:', error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredJobs(jobs);
//     } else {
//       const filtered = jobs.filter((job) => 
//         job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         job.hireType.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredJobs(filtered);
//     }
//   }, [searchQuery, jobs]);

//   if (loading) {
//     return <div className="text-center py-4">Loading...</div>;
//   }

//   if (filteredJobs.length === 0) {
//     return <div className="text-center py-4">No jobs found matching your search criteria.</div>;
//   }

//   return (
//     <div className="space-y-4">
//       {filteredJobs.map((job) => (
//         <JobCard
//           key={job._id}
//           id={job._id}
//           title={job.jobTitle}
//           location="Sri Lanka"
//           type={job.hireType}
//         />
//       ))}
//     </div>
//   );
// };

// // Updated Career Component with search state
// const Career = () => {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div>
//       <section>
//         <div className="min-h-screen bg-zinc-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
//           <div className="relative">
//             <div className="px-4 py-12 mx-auto max-w-7xl">
//               <div className="grid items-center gap-8 md:grid-cols-2">
//                 <div className="space-y-6">
//                   <h1 className="text-6xl font-bold">
//                     Ready to build the next big thing in tech?
//                   </h1>
//                   <div className="space-y-4">
//                     <h2 className="text-2xl font-medium">
//                       Life at <span className="text-emerald-600">Itellisense</span> ...
//                     </h2>
//                     <p className="text-xl text-gray-700">
//                       Are you looking for challenging work and international exposure in an informal, fun and creative work environment? 
//                       Then Intellisense is the place for you. Together, we build great tech!
//                     </p>
//                   </div>
//                 </div>
//                 <div className="hidden md:block">
//                   <img 
//                     src={img11}
//                     alt="Professional working on laptop"
//                     className="rounded-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className='px-4 py-12 mx-auto bg-emerald-100'>
//         <div className="max-w-4xl px-4 mx-auto -mt-28">
//           <div className="p-6 mb-10 bg-white rounded-lg shadow-lg">
//             <div className="relative mb-4">
//               <input
//                 type="text"
//                 placeholder="Search for jobs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-2 pl-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//               <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
//             </div>
//           </div>

//           <Jobvacancies searchQuery={searchQuery} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Career;