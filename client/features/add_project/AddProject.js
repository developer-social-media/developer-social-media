import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectAsync, fetchAllProjectAsync, selectProjects } from '../all_project/allProjectSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserAsync } from '../single_user/singleUserSlice';
import { Button, Stack, TextField, Typography } from '@mui/material';

const AddProject = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.me);
    const projects = useSelector(selectProjects);
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState({
        project_name: '',
        details: '',
        project_type: '',
        technologies: '',
        github_url: '',
        member: userId
    })

    useEffect(() => {
        dispatch(fetchUserAsync(userId));
    }, [dispatch])

    const handleChange = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProjectAsync(project));
        navigate(`/home`);
    }

    useEffect(() => {
        dispatch(fetchAllProjectAsync());
    }, [dispatch])

    return (
        <Stack
            as='form'
            spacing='1rem'
            width={{ base: '90%', md: '500px' }}
            margin='auto'
            height='100vh'
        >
            <Typography variant='h4' align='center' color='primary'>Add Project</Typography>
                <TextField
                id='project_name'
                name='project_name'
                label="Project's Name"
                value={project.project_name}
                onChange={handleChange}
                />
                <TextField
                id='details'
                name='details'
                label="Details about project"
                value={project.details}
                onChange={handleChange}
                />
                <TextField
                id='project_type'
                name='project_type'
                label="Project Type"
                value={project.project_type}
                onChange={handleChange}
                />
                <TextField
                id='technologies'
                name='technologies'
                label="Technologies"
                value={project.technologies}
                onChange={handleChange}
                />
                <TextField
                id='github_url'
                name='github_url'
                label="Github URL"
                value={project.github_url}
                onChange={handleChange}
                />
                <Button onClick={handleSubmit} variant='contained' type='submit'>Submit</Button>
        </Stack>
    )
}

export default AddProject;
