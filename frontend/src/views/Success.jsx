import React, { useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/'); // Navigate after 5 seconds
    }, 5000);
  }, [navigate]); // Add navigate to the dependency array

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography align="center" variant="h1" mb={4}>
          Test is Submitted Successfully!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          You can safely close the window now.
        </Typography>
        <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
          Go Back to Home
        </Button>
      </Container>
    </Box>
  );
};

export default Success;
