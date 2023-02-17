import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  LandingPage,
  Login,
  SignUp,
  AllReportInbox,
  AllUsers,
  ReportUser,
  SingleUser,
  Messages,
  Banned,
  ContactUs,
  SingleReport,
  Notifications,
  EditUser,
  RequestSupport,
  AllSupport,
  SingleSupport,
  Project,
  FriendRequests,
  AllProjects,
  Favorites,
  AddProject,
} from "../features";
import { me } from "./store";
import { useLocation } from "react-router-dom";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const router = useLocation();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isBanned = useSelector((state) => state.auth.me.is_banned);
  const isAdmin = useSelector((state) => state.auth.me.is_admin);
  const dispatch = useDispatch();


  useEffect(() => {
    if (router.search.includes("token")) {
      const TOKEN = "token";
      window.localStorage.setItem(TOKEN, router.search.slice(7));
      //getting search property from use location hook from react router dom and slicing the part to get token
      // npm package call query string where you get and value.
    }
    dispatch(me());
  }, []);

  return (
    <div>
      {isBanned ? (
        <Routes>
          <Route path="/*" element={<Banned />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      ) : isAdmin ? (
        <Routes>
        <Route path="/*" element={<Home />} />
        <Route to="/home" element={<Home />} />
        <Route path="/chat" element={<Messages />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/users/:userId/reportUser" element={<ReportUser />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:userId" element={<SingleUser />} />
        <Route path="/support" element={<RequestSupport />} />
        <Route path="/supportTickets" element={<AllSupport />} />
        <Route path="/support/:id" element={<SingleSupport />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/friendrequests" element={<FriendRequests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reportInbox" element={<AllReportInbox />} />
        <Route path="/report/:id" element={<SingleReport />} />
        <Route path="/project" element={<AllProjects/>}/>
        <Route path="/project/add" element={<AddProject/>}/>
      </Routes>
      ) : isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/chat" element={<Messages />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/users/:userId/reportUser" element={<ReportUser />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/users/:userId" element={<SingleUser />} />
          <Route path="/support" element={<RequestSupport />} />
          <Route path="/project/:projectId" element={<Project/>}/>
          <Route path='/friendrequests' element={<FriendRequests />} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/project" element={<AllProjects/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/project/add" element={<AddProject/>}/>

        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<SignUp name="signup" displayName="Sign Up" />}
          />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
