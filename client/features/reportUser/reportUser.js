import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { selectUser, fetchUserAsync, reportUserAsync } from "../single_user/singleUserSlice";
import theme from "../../app/theme";
import {  FormControl,MenuItem, Stack, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

const ReportUser = () => {
    // selects the user who is logged in currently
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();

    //convert userId to username

    const user = useSelector(selectUser);
    const { username } = user;
    const [error, setError] = useState(null);
    const reportTypes = ["Inappropriate Content", "Spam", "Harassment", "Other"];
    const [reportType, setReportType] = useState(reportTypes[0]);
    const [reportDescription, setReportDescription] = useState("");
    const message = useRef()
    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch, userId]);

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const handleReportDescriptionChange = (event) => {
        setReportDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const report = {
            id: userId,
            reportee: username,
            reason_for_report: reportType,
            message: reportDescription,
        };
        dispatch(reportUserAsync({report})).then((res) => {
            if (res.error) {
                setError(res.payload);
            } else {
                navigate(`/users/${userId}`);
            }
        });
        }

    return (
        <>  
        
        <Stack 
        as='form'
        spacing='2rem'
        width={{base: '90%', md: '500px'}}
        margin='auto'
        height='100vh' 
        >
            
            {/*take username and reportType and reportDescription and send to backend to create a report for that user*/}
            <Typography variant='h4' align='center'color='primary'>Report: {username}</Typography>
            <Typography variant='p'>{error}</Typography>
            
            <FormControl onSubmit={handleSubmit}>
                <Select size='small' value={reportType} onChange={handleReportTypeChange}>
                    {reportTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                    
                </Select>
                <TextField
                id='outlined-basic'
                label='Report Description'
                variant='outlined'
                size='small'
                // type="text"
                onChange={(e) => message.current = e.target.value}
                />
                <Button spacing='2rem' variant='contained' theme={theme} color="primary" onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Stack>
        </>
    );
};
export default ReportUser;
