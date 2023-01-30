import React, { useState } from "react";
import {
  Button,
  TextField,
  ButtonGroup,
  Stack,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import theme from "../../app/theme";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    first_name: yup
      .string("Enter your first name")
      .required("First name is required"),
    last_name: yup
      .string("Enter your last name")
      .required("Last name is required"),
    username: yup
      .string("Enter your username")
      .min(6, "Username should be of minimum 6 characters length")
      .required("Username is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirm_password: yup
      .string("Confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      method: "signup",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values, "values");
      dispatch(authenticate(values, "signup")).then((res) => {
        console.log(res, "res");
        if (res.error) {
            setError(res.payload);
        } else {
            navigate("/");
        }
      });
    },
  });

  return (
    <Stack
      as="form"
      spacing="1rem"
      width={{ base: "90%", md: "500px" }}
      margin="auto"
      height="100vh"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      name={formik.name}
      className="signup-form"
    >
      <Typography variant="h4" align="center" color="primary">
        Create Account
      </Typography>

      <TextField
        fullWidth
        id="first_name"
        name="first_name"
        label="First Name"
        placeholder="Enter your first name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
      />
      <TextField
        fullWidth
        id="last_name"
        name="last_name"
        label="Last Name"
        placeholder="Enter your last name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
      />
      <Typography variant="h4" align="center" color="error">
        {error === "Username already in use!" && <p className="uppercase bg-red text-xl font-large bg-red-400">{error}</p>}
      </Typography>

      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        placeholder="Enter your username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <Typography variant="h4" align="center" color="error">
      {error === "Email already in use!" && <p className="uppercase bg-red text-xl font-large">{error}</p>}
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
      <TextField
        fullWidth
        id="confirm_password"
        name="confirm_password"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={
          formik.touched.confirm_password &&
          Boolean(formik.errors.confirm_password)
        }
        helperText={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />
      <ButtonGroup>
        <Button
          theme={theme}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Create Account
        </Button>
        <Button
          theme={theme}
          color="secondary"
          variant="contained"
          onClick={() => navigate("/login")}
        >
          Return to Login
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default SignUp;
