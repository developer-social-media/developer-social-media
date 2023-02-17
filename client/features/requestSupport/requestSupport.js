import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserAsync, requestBugFeatureSurveyAsync } from "../single_user/singleUserSlice";
import {Stack, Button, TextField, Typography,Select, FormControl,InputLabel, MenuItem} from '@mui/material';
import theme from "../../app/theme";

const RequestSupport = () => {
    // selects the user who is logged in currently
    const username = useSelector((state) => state.auth.me.username);
    const userId = useSelector((state) => state.auth.me.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //convert userId to username

    const [error, setError] = useState(null);
    const requestTypes = ["Bugs", "Feature Request", "Survey", "Other"];
    const [requestType, setRequestType] = useState(requestTypes[0]);
    const [requestDescription, setRequestDescription] = useState("");
    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch, userId]);

    const handleRequestTypeChange = (event) => {
        setRequestType(event.target.value);
    };

    const handleRequestDescriptionChange = (event) => {
        setRequestDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            id: userId,
            username: username,
            type_of_request: requestType,
            description: requestDescription,
        };
        dispatch(requestBugFeatureSurveyAsync(request)).then((res) => {
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
            as="form"
            spacing="1rem"
            width={{base: "90%", md:"500px"}}
            margin="auto"
            height="100vh"
            noValidate
            onSubmit={handleSubmit}
            >
         {/*take username and requestType and requestDescription and send to backend to create a request for that user*/}

            <Typography gutterBottom variant="h5" align="center">Request Support</Typography>


                <FormControl  sx={{width:1}}>
                    <InputLabel color="primary" >Report Types</InputLabel>

                    <Select size='small'  value={requestType} onChange=
                    {handleRequestTypeChange}>
                    {requestTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>

                </FormControl>
              <TextField
              fullWidth
              id="description"
              name="description"
              placeholder="Description"
              value={requestDescription}
              onChange={handleRequestDescriptionChange}
              />
              <Button
              variant="contained"
              theme={theme}
              type="submit"
              color="primary"
              value="Submit"
              >Submit</Button>
          </Stack>

        </>
    )
}

export default RequestSupport;
