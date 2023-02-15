import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFriendshipById,
  selectFriendRequests,
} from "../friends/friendshipSlice";
import { fetchUserAsync, selectUser } from "../single_user/singleUserSlice";
import { selectChat, fetchChat, sendMessage } from "./messagesslice";
import { useParams, useNavigate } from "react-router-dom";
import { Send } from "@mui/icons-material";

const Chatbox = ({receiverId}) => {
  const dispatch = useDispatch();
  //pulls the logged in user's id from the redux store
  const userId = useSelector((state) => state.auth.me.id);
  //pulls the user's friends from the redux store
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  console.log(chat, "chat")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  });

  const chats = {
    userId: userId,
    otherId: receiverId,
  };

  useEffect(() => {
    dispatch(fetchChat(chats));
  }, [dispatch]);

  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageObj = {
      content: message,
      senderId: userId,
      receiverId: receiverId,
    };
    dispatch(sendMessage(messageObj)).then(() => {
      dispatch(fetchChat(chats));
    }).then(() => {
      setMessage("")
    });
  };

  return (
    <div>
      <div>
        <div ref={bottomDiv} />
        {messages.map((message) =>
          message.senderId === userId ? (
            <div style={{ display: "flex", justifyContent: "flex-end", }}>
              <div
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                  maxWidth: "50%",
                  height: "auto",
                }}
              >
                {message.content}
                <br />
                <small className="bg-gray-500 text-xs italic underline">
                  {message.createdAt}
                </small>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" , position: 'flex-start'}}>
              <div
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                  maxWidth: "50%",
                  height: "auto",
                }}
              >
                {message.content}
                <br />
                <small className="bg-gray-500 text-xs italic underline">
                  {message.createdAt}
                </small>
              </div>
            </div>
          )
        )}
      </div>
      {/*display chat postion at the bottom of the chatbox*/}
      <div style={{   position: "static", top: "100%", width: "100%", bottom: "8px", right: "0", fontSize: "18px" }}>
        <form onSubmit={handleSendMessage}
          style={{ display: "flex", justifyContent: "center", position: "sticky", bottom: "0", width: "50%", bottom: "8px", right: "50px", fontSize: "18px" }}
        >
          <input
            type="text"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "90%",
              height: "100%",
              padding: "1rem",
              margin: "1rem",
              borderRadius: "1rem",
              justifyContent: "flex-end",
              }}
          />
          <button 
          sx={{ borderRadius: "1rem", padding: "1rem", margin: "1rem"}}
          type="submit"><Send sx={{color: 'white', display: 'flex'}} /></button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
