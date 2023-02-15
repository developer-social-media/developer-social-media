import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchReportAsync,
  selectReport,
  updateReportAsync,
} from "./singleReportInboxSlice";
import theme from "../../app/theme";
import { Select, MenuItem, Box, Grid,Typography, Table, AppBar, Toolbar, Stack } from "@mui/material";
import Button from '@mui/material/Button';


const SingleReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("userId", id);
  const user = useSelector(selectReport);
  console.log("user", user);
  const { admin_response, report_status } = user;
  const [response, setResponse] = useState(admin_response);
  const [status, setStatus] = useState(report_status);

  useEffect(() => {
    dispatch(fetchReportAsync(id));
  }, [dispatch]);

  const handleAdminMessageChange = (e) => {
    setResponse(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    const updatedReport = {
        id: id,
        admin_response: response,
        report_status: status,
    };
    console.log("updatedReport", updatedReport);
    dispatch(updateReportAsync(updatedReport));
    navigate("/report");
  };

  return (
    <Stack
    spacing='2rem'
    width={{base: '90%', md: '500px'}}
    margin='auto'
    height='100vh'
    >
      <Box
        sx={{
          width: 500,
          height: 400,
          borderRadius: 2,
          p: 8,
          border: "3px solid black ",
          marginLeft: 10,
          marginTop: 50,
        }}
      >
        <Grid alignItems="center">
          <Typography variant='h4'>Offender: {user.reportee}</Typography>
          <Typography variant='p' gutterBottom>Type of Report: {user.reason_for_report}</Typography>
          <Typography variant='p' gutterBottom>Reporter's message: {user.message}</Typography>
          {/*change admin_repsonse to text area*/}
          <Typography variant='p'>Admin's response: {user.admin_response}</Typography>
          <Typography variant='p'>Status: {user.report_status}</Typography>
        </Grid>
        <input
          type="text"
          value={response}
          onChange={handleAdminMessageChange}
          placeholder="Enter your response"
        />
        <select value={status} onChange={handleStatusChange}>
          <option value="pending">pending</option>
          <option value="resolved">resolved</option>
        </select>
        <br></br>
        <Button variant='contained' theme={theme} color="primary" onClick={handleUpdateStatus}>Update</Button>
      </Box>
    </Stack>
  );
};

export default SingleReport;
