import { Container, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from 'react-router-dom'

const Footer = () => {

    return(
        <footer>
            <Grid display='flex' justifyContent='space-evenly'>
            <Typography>Terms of service</Typography>
            <IconButton href="https://twitter.com">
            <TwitterIcon/>
            </IconButton>
            <InstagramIcon/>
            <FacebookIcon/>
            <LinkedInIcon/>
            </Grid>
        </footer>
    )
}

export default Footer;