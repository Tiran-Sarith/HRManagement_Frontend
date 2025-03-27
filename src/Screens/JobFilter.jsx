// import React, { useState } from 'react';
// import { Filter, X } from 'lucide-react';

// const JobFilter = ({ jobs, onFilteredJobsChange }) => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     jobCategories: [],
//     jobTypes: [],
//     locations: []
//   });

//   // Extract unique values for filters
//   const uniqueCategories = [...new Set(jobs.map(job => job.jobCategory))];
//   const uniqueJobTypes = [...new Set(jobs.map(job => job.hireType))];
//   const uniqueLocations = ['Sri Lanka']; // Modify as needed

//   // Handle filter checkboxes
//   const handleFilterChange = (filterType, value) => {
//     setFilters(prev => {
//       const currentFilter = prev[filterType];
//       const newFilter = currentFilter.includes(value)
//         ? currentFilter.filter(item => item !== value)
//         : [...currentFilter, value];
      
//       return { ...prev, [filterType]: newFilter };
//     });
//   };

//   // Apply filters
//   const applyFilters = () => {
//     let filteredJobs = jobs;

//     if (filters.jobCategories.length > 0) {
//       filteredJobs = filteredJobs.filter(job => 
//         filters.jobCategories.includes(job.jobCategory)
//       );
//     }

//     if (filters.jobTypes.length > 0) {
//       filteredJobs = filteredJobs.filter(job => 
//         filters.jobTypes.includes(job.hireType)
//       );
//     }

//     if (filters.locations.length > 0) {
//       filteredJobs = filteredJobs.filter(job => 
//         filters.locations.includes('Sri Lanka')
//       );
//     }

//     onFilteredJobsChange(filteredJobs);
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setFilters({
//       jobCategories: [],
//       jobTypes: [],
//       locations: []
//     });
//     onFilteredJobsChange(jobs);
//   };

//   return (
//     <div className="relative">
//       {/* Filter Toggle Button */}
//       <button 
//         onClick={() => setIsFilterOpen(!isFilterOpen)}
//         className="flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
//       >
//         <Filter size={16} />
//         {isFilterOpen ? 'Close Filters' : 'Open Filters'}
//       </button>

//       {/* Filter Sidebar */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 z-50 bg-black/50 lg:bg-transparent">
//           <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 overflow-y-auto transform transition-transform lg:static lg:block lg:w-full lg:shadow-none lg:bg-transparent">
//             {/* Mobile Close Button */}
//             <button 
//               onClick={() => setIsFilterOpen(false)}
//               className="absolute top-4 left-4 lg:hidden"
//             >
//               <X size={24} className="text-gray-600" />
//             </button>

//             <div className="space-y-6 mt-12 lg:mt-0">
//               {/* Job Category Filter */}
//               <div>
//                 <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Category</h3>
//                 {uniqueCategories.map(category => (
//                   <div key={category} className="flex items-center mb-2">
//                     <input
//                       type="checkbox"
//                       id={`category-${category}`}
//                       checked={filters.jobCategories.includes(category)}
//                       onChange={() => handleFilterChange('jobCategories', category)}
//                       className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
//                     />
//                     <label 
//                       htmlFor={`category-${category}`}
//                       className="ml-2 text-sm text-gray-700"
//                     >
//                       {category}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Job Type Filter */}
//               <div>
//                 <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Type</h3>
//                 {uniqueJobTypes.map(type => (
//                   <div key={type} className="flex items-center mb-2">
//                     <input
//                       type="checkbox"
//                       id={`type-${type}`}
//                       checked={filters.jobTypes.includes(type)}
//                       onChange={() => handleFilterChange('jobTypes', type)}
//                       className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
//                     />
//                     <label 
//                       htmlFor={`type-${type}`}
//                       className="ml-2 text-sm text-gray-700"
//                     >
//                       {type}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Location Filter */}
//               <div>
//                 <h3 className="mb-4 text-lg font-semibold text-gray-900">Location</h3>
//                 {uniqueLocations.map(location => (
//                   <div key={location} className="flex items-center mb-2">
//                     <input
//                       type="checkbox"
//                       id={`location-${location}`}
//                       checked={filters.locations.includes(location)}
//                       onChange={() => handleFilterChange('locations', location)}
//                       className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
//                     />
//                     <label 
//                       htmlFor={`location-${location}`}
//                       className="ml-2 text-sm text-gray-700"
//                     >
//                       {location}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Filter Actions */}
//               <div className="flex space-x-4 mt-6">
//                 <button 
//                   onClick={applyFilters}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
//                 >
//                   Apply Filters
//                 </button>
//                 <button 
//                   onClick={resetFilters}
//                   className="flex-1 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobFilter;




import React, { useState } from 'react';
import { Filter, X, Sliders } from 'lucide-react';

const JobFilter = ({ jobs, onFilteredJobsChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobCategories: [],
    jobTypes: [],
    locations: []
  });

  // Extract unique values for filters
  const uniqueCategories = [...new Set(jobs.map(job => job.jobCategory))];
  const uniqueJobTypes = [...new Set(jobs.map(job => job.hireType))];
  const uniqueLocations = ['Sri Lanka']; // Modify as needed

  // Handle filter checkboxes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const currentFilter = prev[filterType];
      const newFilter = currentFilter.includes(value)
        ? currentFilter.filter(item => item !== value)
        : [...currentFilter, value];
      
      return { ...prev, [filterType]: newFilter };
    });
  };

  // Apply filters
  const applyFilters = () => {
    let filteredJobs = jobs;

    if (filters.jobCategories.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.jobCategories.includes(job.jobCategory)
      );
    }

    if (filters.jobTypes.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.jobTypes.includes(job.hireType)
      );
    }

    if (filters.locations.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.locations.includes('Sri Lanka')
      );
    }

    onFilteredJobsChange(filteredJobs);
    setIsSidebarOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      jobCategories: [],
      jobTypes: [],
      locations: []
    });
    onFilteredJobsChange(jobs);
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-gray-300"
      >
        <Sliders size={16} />
        Filters
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-xl transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Filter Jobs</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-120px)]">
          {/* Job Category Filter */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Category</h3>
            {uniqueCategories.map(category => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.jobCategories.includes(category)}
                  onChange={() => handleFilterChange('jobCategories', category)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label 
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>

          {/* Job Type Filter */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Type</h3>
            {uniqueJobTypes.map(type => (
              <div key={type} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  checked={filters.jobTypes.includes(type)}
                  onChange={() => handleFilterChange('jobTypes', type)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label 
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Location</h3>
            {uniqueLocations.map(location => (
              <div key={location} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`location-${location}`}
                  checked={filters.locations.includes(location)}
                  onChange={() => handleFilterChange('locations', location)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label 
                  htmlFor={`location-${location}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <div className="flex space-x-4">
            <button 
              onClick={applyFilters}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
            >
              Apply Filters
            </button>
            <button 
              onClick={resetFilters}
              className="flex-1 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobFilter;