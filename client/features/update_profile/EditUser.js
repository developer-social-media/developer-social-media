import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  fetchUserAsync,
  selectUser,
} from "../single_user/singleUserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Autocomplete, Box, Button ,Container,FormControl,Grid, Stack, TextField, Typography} from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";


const EditUser =()=> {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const Navigate = useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [skill_level, setSkillLevel] = useState("")


  useEffect(() => {
    dispatch(fetchUserAsync(userId));
  }, [dispatch]);

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    const editedUser =  {
      id: userId,
       first_name: first_name ,
        last_name: last_name, email: email,
         about_me: about_me,
          skill_level: inputValue
        }
    dispatch(editUser(editedUser));
  }

  const skill = [
    {label: 'Beginner'},
    {label: 'Intermediate'},
    {label: 'Professional'},
    {label: 'Master'},
  ]

  return (
    <Stack
    as='form'
    spacing='1rem'
    width={{base: '90%', md: '500px'}}
    margin='auto'
    height='100vh'
    >
      <Typography variant="h4" align="center" color='primary'>Edit Profile</Typography>
        <TextField
        id="first_name"
        name="first_name"
        label='First name'
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
        id="last_name"
        name='last_name'
        label='Last Name'
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl  onSubmit={handleSubmit} sx={{ width: 1 }}>
        <Autocomplete
          id='skill_level'
          disablePortal
          value={value}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={skill}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Skill Level'
            />)}
            />
            </FormControl>
        <TextField
        id="about_me"
        name="about_me"
        label="Tell us about yourself...."
        value={about_me}
        onChange={(e) => setAboutMe(e.target.value)}
        />
        <Button onClick={handleSubmit} variant="contained" type="submit">Submit</Button>
    </Stack>
  );
}

export default EditUser;



