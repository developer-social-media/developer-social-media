import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchReportAsync,
  selectReport,
  updateReportAsync,
} from "./singleReportInboxSlice";
import { Box, Grid, Typography, Table, AppBar, Toolbar } from "@mui/material";

const SingleReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportId } = useParams();
  console.log("userId", reportId);
  const user = useSelector(selectReport);
  console.log("user", user);
  const { admin_response, report_status } = user;
  const [response, setResponse] = useState(admin_response);
  const [status, setStatus] = useState(report_status);

  useEffect(() => {
    dispatch(fetchReportAsync(reportId));
  }, [dispatch]);

  const handleAdminMessageChange = (e) => {
    setResponse(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    const updatedReport = {
        id: reportId,
        admin_response: response,
        report_status: status,
    };
    console.log("updatedReport", updatedReport);
    dispatch(updateReportAsync(updatedReport));
    navigate("/report");
  };

  return (
    <div>
      <Box
        sx={{
          width: 300,
          height: 300,
          p: 8,
          border: "1px solid black",
          marginLeft: 10,
          marginTop: 50,
        }}
      >
        <Grid alignItems="center">
          <Typography>Offender: {user.reportee}</Typography>
          <Typography>Type of Report: {user.reason_for_report}</Typography>
          <Typography>Reporter's message: {user.message}</Typography>
          {/*change admin_repsonse to text area*/}
          <Typography>Admin's response: {user.admin_response}</Typography>
          <Typography>Status: {user.report_status}</Typography>
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
        <button onClick={handleUpdateStatus}>Update</button>
      </Box>
    </div>
  );
};

export default SingleReport;
