import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
      <Link color="inherit" href='https://twitter.com'><TwitterIcon/></Link>
      <Link color="inherit" href='https://instagram.com'><InstagramIcon/></Link>
      <Link color="inherit" href='https://facebook.com'><FacebookIcon/></Link>
      <Link color="inherit" href='https://linkedin.com'><LinkedInIcon/></Link>
    </Typography>
  );
}

const StickyFooter = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minheight: '100vh',
        position: 'fixed',
        width: '100%',
        bottom: 0,
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}

export default StickyFooter;