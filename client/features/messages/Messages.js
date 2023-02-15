import React, {useEffect, useState} from "react";
import { Grid, Box, Typography, Tabs } from "@mui/material";
import SideBar from "../sidebar/SideBar";
import { useDispatch } from "react-redux";
import { fetchChat } from "./messagesslice";
import Chatbox from "./Chatbox";

const Messages = () => {
    const [receiverId, setReceiverId ] = useState(null)

    const dispatch = useDispatch()
    const chatter  = {
        userId: 1,
        otherId: 2
    }


    useEffect(() => {
        dispatch(fetchChat(chatter))
    },[])



    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4">Messages</Typography>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={10} value={Tabs} height='100vh' >
                {/*the first column uses 30% of the screen */}
                <Grid item xs={3}>
                    <Box sx={{ bgcolor: "#023c40", height: "100vh", borderRadius:"10px", padding:'10px' }}>
                        <SideBar receiverId={receiverId} setReceiverId={setReceiverId}/>
                        {/*the second column uses 70% of the screen */}
                    </Box>
                </Grid>
                <Grid item xs={7} maxHeight="100vh" overflow='scroll'>
                    {/*the chatbox stays in the middle of the screen */}
                    <Box sx={{ bgcolor: "#023c40", borderRadius:'10px', height: '100vh', width: '70%', position:'absolute', overflow:'scroll'}}>
                        <Chatbox receiverId={receiverId}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>
    );
};

export default Messages;
