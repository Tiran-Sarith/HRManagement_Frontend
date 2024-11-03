import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slide1image from "./Assests/banner-5250179_1280.jpg";

const JobPost = () => {
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
      <section >
      <img
          className="object-cover w-full h-full"
          src={slide1image}
          alt="Section 1 Image"
        />
        <div className="absolute inset-0 flex items-center justify-center mx-20">
          <div className="p-4 text-center bg-transparent   max-w-[1000px]">
            <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-normal text-white">
            Do the Most Meaningful Work of Your Career
    
            </h2>
            <p className="mb-4 text-lg font-medium text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
            </p>
            
          </div>
        </div>
      </section>
    <div className="p-6 mt-10 text-left bg-white w-fit mx-28 ">
      {/* Left Column */}
      <div className="grid grid-cols-1 gap-20 mr-20 md:grid-cols-2">
        <div className="space-y-6">
          {/* Job Details Section */}
          <div className="w-2/3 py-8 mx-3 my-4 mb-8 px-">
            <h1 className="mb-4 text-xl font-bold text-gray-800">ENGINEER - CLOUD SERVICES</h1>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div>Category: Engineer</div>
              <div>Job ID: Job ID</div>
              <div>Hire Type: Full Time</div>
              <div>Job posted: 2024-05-28</div>
              <div>Deadline: 2024-08-20</div>
            </div>

            <button className="px-6 py-2 mt-4 text-sm text-white bg-green-700 rounded">
              Apply Now
            </button>
          </div>

          {/* Benefits Section */}
          <div className="p-6 mb-20 rounded-lg shadow-xl bg-lime-100">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              BENEFITS
              <span className="ml-2 text-4xl text-green-500">♦</span>
            </h2>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-600">
              <li>• US dollar-linked compensation</li>
              <li>• Performance-based annual bonus</li>
              <li>• Performance matrix-based recognition</li>
              <li>• Agile Benefits - special allowances for Health, Wellness & Academic growth</li>
              <li>• Paid birthday leave</li>
              <li>• Team engagement allowance</li>
              <li>• Comprehensive Health & Life Insurance Cover - extendable to parents and in-laws</li>
              <li>• Overseas travel opportunities and exposure to client environments</li>
              <li>• Hybrid work arrangement</li>
            </ul>
          </div>

          {/* What We Offer Section */}
          <div className="p-6 mt-20 rounded-lg shadow-xl bg-lime-100">
            <h2 className="flex items-center mb-4 text-lg font-bold">
              WHAT WE OFFER
              <span className="ml-2 text-4xl text-green-500">♦</span>
            </h2>
            <p className="text-sm leading-loose text-gray-600">
              Our careers offer a flexible working environment, attractive remuneration, and 
              a place to grow and flourish. You will be amongst peers at the top of their game, 
              allowing you to sharpen your skills in an inclusive culture. We offer a variety of 
              spaces that support their work-life balance and integrate wellness into our 
              workplace experience, which includes a relaxation zone and gaming area.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="px-8 py-8 mx-3 my-4 space-y-6 shadow-xl">
          {/* About Section */}
          <div>
            <h2 className="mb-4 text-lg font-bold">ABOUT THIS POSITION</h2>
            <p className="text-sm leading-loose text-gray-600">
              We are currently on the lookout for a competent, self-motivated Engineer – 
              Cloud Services for our Cloud Services team with a solid understanding of 
              Linux, GCP/AWS Cloud and Azure to collaborate, lead change, automate 
              and inspire teams towards delivery excellence at Intelligence.
            </p>
          </div>

          {/* Responsibilities Section */}
          <div>
            <h2 className="mb-4 text-lg font-bold">RESPONSIBILITIES</h2>
            <ul className="space-y-2 text-sm leading-loose text-gray-600">
              <li>• Driving the creation of infrastructure, environment provisioning, 
                automation and monitoring tools that will support, enhance and grow 
                an advanced infrastructure support model for Sysco's multi-cloud 
                environments</li>
              <li>• Designing and developing re-usable components and operational 
                strategies in the cloud and datacenters to support scalability, high-
                availability, performance, monitoring, backup, restoring, etc.</li>
              <li>• Acting as SME for Linux based workloads, providing solutions to 
                problems, handling migrations, and troubleshooting any issues in a 
                timely manner</li>
              <li>• Working with tools such as Jenkins, Docker, Terraform, AWS Systems 
                Manager, Cloud Formation, and Kubernetes for cloud operation work on 
                AWS, GCP and Azure</li>
              <li>• Patch Management and coordinating patch schedules with other teams</li>
              <li>• Improving our knowledge base and engineering standards through 
                documentation</li>
              <li>• Ensuring the security of all infrastructure, data, 
                applications, and configurations</li>
              <li>• Automation and scripting via Ansible, Python, Bash, Cloud Formation or 
                Terraform</li>
              <li>• Monitoring and proactively managing systems and application issues</li>
              <li>• Working on a roster covering 24/7 support to our end users</li>
            </ul>
          </div>

          {/* Requirements Section */}
          <div>
            <h2 className="mb-4 text-lg font-bold">REQUIREMENTS</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• A Bachelor's Degree in Computer Science or equivalent</li>
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
                be an added advantage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobPost;