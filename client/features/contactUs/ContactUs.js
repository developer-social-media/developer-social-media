import { Box, Container, Card } from "@mui/material";
import React from "react";

const ContactUs = () => {

  

  return (
    <Box
    sx={{
      minheight: '100vh'
    }}
    >
      <Container maxWidth='sm'>
        <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          objectFit: 'cover'
        }}>
          <h1>Contact Us</h1>
          <p>Phone: 1-800-555-5555</p>
          <p>Email: test@email.com</p>
          <img
            src='contactUs.jpg'
            alt='contact us'
            style={{ width: '100%', height: '100%' }}
          />
        </Card>
      </Container>
      </Box>
  );
};

export default ContactUs;
