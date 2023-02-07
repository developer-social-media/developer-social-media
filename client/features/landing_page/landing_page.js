import React, { useEffect, useState, useMemo } from 'react';
import { CssBaseline, Typography, Container, Collapse, IconButton, Grid, Card, CardContent, CardMedia, CardActionArea, Stack, Box } from '@mui/material'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import theme from '../../app/theme';


const darkTheme = createTheme({
palette: {
    mode: 'dark'
}
})

const LandingPage = () => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
        <div>
            <Container maxWidth='large' minHeight='100vh' >
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={100} align='center'>
                    <Typography variant='h2' color='textPrimary'>Landing Page</Typography>
                </Collapse>
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={100} align='center'>
                    <Stack sx={{ pt: '1' }} width={{ base: '90%', md: '600px' }} direction='row' spacing={10} justifyContent='center' marginTop={10}>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100vh"
                                    image=""
                                    alt=""
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" align='center'>
                                        About Us
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque felis imperdiet proin fermentum leo vel orci. Tempus iaculis urna id volutpat lacus. Porttitor lacus luctus accumsan tortor posuere ac. Porta non pulvinar neque laoreet. Velit sed ullamcorper morbi tincidunt ornare massa eget.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: 600 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="100vh"
                                    image=""
                                    alt=""
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" align='center'>
                                        Objective
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur. Lobortis mattis aliquam faucibus purus. Morbi blandit cursus risus at ultrices. Accumsan tortor posuere ac ut consequat semper viverra nam libero. In aliquam sem fringilla ut. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque felis imperdiet proin fermentum leo vel orci. Tempus iaculis urna id volutpat lacus. Porttitor lacus luctus accumsan tortor posuere ac. Porta non pulvinar neque laoreet. Velit sed ullamcorper morbi tincidunt ornare massa eget.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Stack>
                </Collapse>
            </Container>
        </div>
    )
}

export default LandingPage;
