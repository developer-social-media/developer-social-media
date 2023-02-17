import React, { useEffect } from "react";
import { fetchAllSupportAsync, selectAllSupport } from "./allSupportSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import theme from "../../app/theme";

const AllSupport = () => {
    const dispatch = useDispatch();
    const supportTickets = useSelector(selectAllSupport);


    useEffect(() => {
        dispatch(fetchAllSupportAsync());
    }, [dispatch]);

    //this will return a table of all users
    return (
        <div>
            <Typography component='h2' variant="h6" align="center" fontWeight='bold' gutterBottom>All Support</Typography>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>View Support Ticket</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Support Type</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                {/*This will return a list of users.  We can also view a single user. */}
                <TableBody>
                    {supportTickets.map((supportTicket) => (
                        <TableRow key={supportTicket.id}>
                            <TableCell>
                                <Button variant="contained" theme={theme} color="primary" component={Link} to={`/support/${supportTicket.id}`}>View</Button>
                            </TableCell>
                            <TableCell>{supportTicket.username}</TableCell>
                            <TableCell>{supportTicket.type_of_request}</TableCell>
                            <TableCell>{supportTicket.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}

export default AllSupport;
