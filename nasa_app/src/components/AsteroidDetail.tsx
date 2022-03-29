import React from 'react';
import {useLocation} from 'react-router';
import {Box} from '@mui/material';

const AsteroidDetail = () => {
	const location = useLocation();
	const data:any = location.state;
    return (
        <Box>
        	<Box
        		border={1}
        		borderColor='grey.500'
        		bgcolor='white.main'
        		borderRadius={5}
        		boxShadow={3}
        		width={500}
        		height={200}
        		mx="auto"
        		mt='2rem'
        	>
        		<div>
                    <h1 data-testid="asteroid-heading"> Asteroid Information</h1>
        			<h3>
        				Name : {data.name}
        			</h3>
        			<h3>
        				nasa_jpl_url : {data.nasa_jpl_url}
        			</h3>
        			<h3>
        				is_potentially_hazardous_asteroid : {data.is_potentially_hazardous_asteroid ? 'True' : 'False'}
        			</h3>
        		</div>
        	</Box>
        </Box>
    );
};

export default AsteroidDetail;