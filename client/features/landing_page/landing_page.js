import React, { useEffect, useState } from 'react';
import {
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography,
    Container,
    Collapse,
    IconButton,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Stack,
    Avatar,
    AvatarGroup,
    Box,
    CardActions,
    Button,
} from '@mui/material'


const LandingPage = () => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <div>
            <Container maxWidth='large' minheight='100vh' >
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedheight={100} align='center'>
                    <img src='logo.png' alt='logo' />
                </Collapse>
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedheight={100} align='center'>
                    <Stack sx={{ pt: '1' }} width={{ base: '100%', md: '900px' }} direction='row' spacing={20} justifyContent='center' marginTop={5}>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                    About Us
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardActionArea>
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" align='center'>
                                        Objective
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Stack>
                </Collapse>
            </Container>
            <Container sx={{ py: 9 }} maxWidth="lg">
                <Grid container spacing={2} columns={10}>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'hidden' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    p: '30px',
                                    mt: '15%',
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                                image='jeffzhang.jpeg'
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" align='center'>
                                    Jeff Zhang
                                </Typography>
                                <Typography variant='h6' align='center'>Role: Developer</Typography>
                                <Typography>
                                "I am an aspiring developer looking to takeover ChatGPT and love to play basketball in my free time "
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'hidden' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    p: '30px',
                                    mt: '15%',
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                                image="patrickkenny.jpg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" align='center'>
                                    Patrick Kenny
                                </Typography>
                                <Typography variant='h6' align='center'>Role: Developer</Typography>
                                <Typography>
                                "Chicago based programmer chasing his dream of being employed again"
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'hidden' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    p: '30px',
                                    mt: '15%',
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                                image="kevintaylor2.jpg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" align='center'>
                                    Kevin Taylor
                                </Typography>
                                <Typography variant='h6' align='center'>Role: Developer</Typography>
                                <Typography>
                                "retired marine, future Software Engineer. Favorite quote: hackers of the world unite "
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'hidden' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    p: '30px',
                                    mt: '15%',
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                                image="kevinwilliams.jpeg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" align='center'>
                                    Kevin Williams
                                </Typography>
                                <Typography variant='h6' align='center'>Role: Developer</Typography>
                                <Typography>
                                "I enjoy programming.  I consider myself a life long learner.  Sidenote: Tarantulas are actually pretty cool."
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'hidden' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    p: '30px',
                                    mt: '15%',
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                                image="cameshagoods.jpg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" align='center'>
                                    Camesha Goods
                                </Typography>
                                <Typography variant='h6' align='center'>Role: Developer</Typography>
                                <Typography>
                                “I haven't spoken to my mom in years. I didn't want to interrupt her.”
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LandingPage;
