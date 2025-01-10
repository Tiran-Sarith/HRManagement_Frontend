import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import image from '../Screens/Assests/Section 02.png';

function ApplicationCard({ application }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/cvs/${application._id}`);
    };

    if (!application) return null;

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <button onClick={handleClick} className="w-full text-left">
                    <CardHeader
                        title={application.name || 'No Name'}
                        subheader={`Email: ${application.email || 'No Email'}`}
                    />
                    <CardMedia
                        component="img"
                        height="50"
                        image={image}
                        alt="Application image"
                    />
                    <CardContent>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Phone: {application.phoneNo || 'No Phone Number'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Portfolio: {application.portfolio || 'No Portfolio'}
                        </Typography>
                    </CardContent>
                </button>
            </Card>
        </div>
    );
}

export default ApplicationCard;