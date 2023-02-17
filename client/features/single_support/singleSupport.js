import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleSupportAsync,
  selectSingleSupport,
  updateSingleSupportAsync,
} from "./singleSupportSlice";
import {
  Box,
  Grid,
  Typography,
  Table,
  AppBar,
  Toolbar,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material";
import  theme  from "../../app/theme";

const SingleSupport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const supportTicket = useSelector(selectSingleSupport);
  const [status, setStatus] = useState(supportTicket.status);
  const statusTypes = ["Open", "In Progress", "Closed"];
  const [priority, setPriority] = useState(supportTicket.priority);
  const priorityTypes = ["N/A", "Low", "Medium", "High"];
  const [adminComment, setAdminComment] = useState(supportTicket.admin_comment);

  useEffect(() => {
    dispatch(fetchSingleSupportAsync(id));
  }, [dispatch, id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleAdminCommentChange = (e) => {
    setAdminComment(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedSupport = {
      id: supportTicket.id,
      status: status,
      priority: priority,
      admin_comment: adminComment,
    };
    dispatch(updateSingleSupportAsync(updatedSupport));
    navigate("/supportTickets");
  };

  return (
    <div>
      <AppBar position="static" theme={theme} color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            align="center"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Support Ticket
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{supportTicket.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support Type</TableCell>
                  <TableCell>{supportTicket.type_of_request}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Message</TableCell>
                  <TableCell>{supportTicket.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>{supportTicket.createdAt}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell theme={theme} color="secondary">
                    <select value={status} onChange={handleStatusChange}>
                      {statusTypes.map((statusType) => (
                        <option key={statusType} value={statusType}>
                          {statusType}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Priority</TableCell>
                  <TableCell  theme={theme} color="secondary">
                    <select value={priority} onChange={handlePriorityChange}>
                      {priorityTypes.map((priorityType) => (
                        <option key={priorityType} value={priorityType}>
                          {priorityType}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Admin Comment</TableCell>
                  {/*update the admin comment*/}
                  <TableCell>
                    <input
                      type="text"
                      value={adminComment}
                      onChange={handleAdminCommentChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      theme={theme}
                      color="primary"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleSupport;
