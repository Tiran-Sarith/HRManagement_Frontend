// import { Link } from 'react-router-dom';
// import { MapPin, Clock } from 'lucide-react';

// const JobCard = ({ id, title, location, type, salary }) => (
//   <div className="flex items-center justify-between p-4 mb-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
//     <div className="flex items-center space-x-4">
//       <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600">
//         <span className="text-xl font-semibold text-white">{title.charAt(0)}</span>
//       </div>

//       <div className="space-y-1">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <div className="flex items-center space-x-4 text-sm text-gray-600">
//           <div className="flex items-center space-x-1">
//             <MapPin size={16} className="text-emerald-600" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Clock size={16} className="text-emerald-600" />
//             <span>{type}</span>
//           </div>
//           <div className="text-gray-600">Rs {salary.toLocaleString()}</div>
//         </div>
//       </div>
//     </div>

//     {/* View Details Link */}
//     <Link to={`/jobs/${id}`} className="px-4 py-2 text-white transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700">
//       View Details
//     </Link>
//     <button className="px-4 py-2 text-white transition-colors rounded-full bg-emerald-600 hover:bg-emerald-700">
//       View Details
//     </button>
//   </div>
// );

// export default JobCard;
