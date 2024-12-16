import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import image from '../Screens/Assests/Section 02.png'
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));
  

function ApplicationCard() {

    const [expanded, setExpanded] = React.useState(false);

    const navigate = useNavigate();

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    const handleClick = ()=>{
        navigate('/cvs')
    }

  return (
  <div>
        <Card sx={{ maxWidth: 345 }}>
            <button onClick={handleClick}>
                <CardHeader
                    title="Vacancy Category Name "
                    subheader="Posted: September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="50"
                    image={image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Number of Applications:

                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    </ExpandMore>
                </CardActions>
            </button>
        </Card>

  </div>

  )
}

export default ApplicationCard