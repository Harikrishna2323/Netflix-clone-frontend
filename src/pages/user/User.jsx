import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import "./user.css";

export default function User() {
  // router.patch("/:id", verify,

  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const id = user.user._id;
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        `/api/users/find/${id}`,
        { username, email, phone, from },
        {
          headers: {
            token: "Bearer " + user.token,
          },
        }
      );

      setData(data);
    };
    getUser();
  }, []);
  console.log(data);

  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.passowrd);
  const [phone, setPhone] = useState(data.phone);
  const [from, setFrom] = useState(data.from);

  const [img, setimg] = useState(data.profilePic);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(
      `/api/users/${id}`,
      { username, email, password, phone, from },
      {
        headers: {
          token: "Bearer " + user.token,
        },
      }
    );
    console.log(data);
  };

  return (
    <div className="user">
      {user.user.isAdmin && (
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
      )}

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.profilePic} alt="profile" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.username}</span>
              <span className="userShowUserTitle">{data.role}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.username}</span>
            </div>
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{data.dob}</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.from}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  defaultValue={data.username}
                  className="userUpdateInput"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="userUpdateItem">
                <label htmlFor="email_field">Email</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  id="email_field"
                  defaultValue={data.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="******"
                  className="userUpdateInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  defaultValue={data.phone}
                  className="userUpdateInput"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Kerala | India"
                  defaultValue={data.from}
                  className="userUpdateInput"
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={data.profilePic}
                  alt=""
                  // onChange={(e) => {
                  //   setImg(e.target.value.getAsDataURL());
                  // }}
                />
              </div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
