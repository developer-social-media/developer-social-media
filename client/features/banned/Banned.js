import React from "react";
import { Box, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

const Banned = () => {



  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <h1>This account has been banned</h1>
          <img
            src='accessDenied.jpg'
            alt='access denied'
            style={{ width: "100%", height: "100%" }}
          />
        </Card>
      </Box>
    </>
  );
};

export default Banned;
