// import JobCard from './JobCard';

// const Jobvacancies = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:8070/vacancies/Vview')
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
//     <div className="space-y-4">
//       {jobs.map((job) => (
//         <JobCard
//           key={job._id}
//           id={job._id}
//           title={job.jobTitle}
//           location="Sri Lanka"
//           type={job.hireType}
//           salary={job.salary || 150000}
//         />
//       ))}
//     </div>
//   );
// };

// export default Jobvacancies;
