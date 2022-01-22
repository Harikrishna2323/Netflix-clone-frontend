import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext/userContext";
import { deleteUser } from "../../context/userContext/apiCalls";

export default function WidgetSm() {
  const { user } = useContext(AuthContext);
  // const { users } = useContext(UserContext);
  // console.log(users);

  const [newUsers, setNewUsers] = useState([]);

  const handleDelete = async (id) => {
    const res = await axios.delete("/api/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    console.log(res);
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/api/users/", {
          headers: {
            token: "Bearer " + user.token,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((displayUser) => (
          <li className="widgetSmListItem">
            <img
              src={
                displayUser.profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{displayUser.username}</span>
            </div>

            <Link to="/user">
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </Link>
            {!displayUser.isAdmin ? (
              <button
                className="widgetSmButton"
                onClick={handleDelete(displayUser._id)}
              >
                <Visibility className="widgetSmIcon" />
                Delete
              </button>
            ) : (
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
