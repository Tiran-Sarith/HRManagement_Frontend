import * as React from 'react';
import { useState, useEffect } from 'react';
import ApplicationCard from '../Components/ApplicationCard';
import axios from 'axios';

function Applications() {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:8070/applications/Aview');
            console.log('Fetched data:', response.data); // Debug log
            setApplications(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching applications');
            setLoading(false);
            console.error('Error:', err);
        }
    };

    // Only filter if applications exist and searchTerm is not empty
    const filteredApplications = applications?.filter(app => 
        app?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div>
            <div className='border-2 border-green-500 rounded-xl bg-white m-4 w-[455px]'>
                <input 
                    type="search" 
                    className='w-96'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search applications..."
                />
                <label htmlFor="Search" className='text-green-700'>Search</label>
            </div>

            {loading && <div>Loading applications...</div>}
            {error && <div className="text-red-500">{error}</div>}
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {!loading && applications.length === 0 && (
                    <div>No applications found</div>
                )}
                {applications.map((application) => (
                    <ApplicationCard 
                        key={application._id || Math.random()}
                        application={application}
                    />
                ))}
            </div>
        </div>
    );
}

export default Applications;
