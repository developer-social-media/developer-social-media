import React, { useState } from "react";
import {
  Button,
  TextField,
  ButtonGroup,
  Stack,
  Typography,
  Box,
  Card,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import theme from "../../app/theme";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../app/store";



const Login = () => {
  const devVideo = '/devVideo.mp4'
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      method: "login",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authenticate(values, "login")).then((res) => {
        if (res.payload) {
          setError(res.payload);
        } else {
          navigate("/");
        }
      });
    },
  });


  return (
    <Box
    component='div'
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "96vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        objectFit: "cover",
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={devVideo} type="video/mp4" />
        </video>

    <Stack
      as="form"
      spacing="1rem"
      width={{ base: "90%", md: "500px" }}
      margin="auto"
      height={{ base: "90%", md: "300px" }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" align="center" color="#415A77" fontFamily='fantasy'>
        Login
      </Typography>


      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>

      <TextField
 
        fullWidth
        id="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "1rem",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button theme={theme} color="tertiary" variant="contained" type="submit">
          Login
        </Button>
        <Button
          theme={theme}
          color="secondary"
          variant="contained"
          type="submit"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
        <a href="/auth/google/callback"><Button
          theme={theme}
          color='primary'
          variant="contained"
        >Google</Button></a>
      </ButtonGroup>
    </Stack>
    </Card>
    </Box>
  );
};

export default Login;
