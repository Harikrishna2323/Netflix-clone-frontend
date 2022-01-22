import "./newUser.css";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../authContext/AuthContext";

export default function NewUser() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [from, setFrom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/api/users",
      { username, password, email, phone, from },
      {
        headers: {
          token: "Bearer " + user.token,
        },
      }
    );
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="newUser">
        <form className="newUserForm" onSubmit={handleSubmit}>
          <h1 className="newUserTitle">New User</h1>
          <div className="newUserItem">
            <label className="formLabel">Username</label>
            <input
              type="text"
              placeholder="john"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="newUserItem">
            <label className="formLabel">Email</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label className="formLabel">Password</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label className="formLabel">Phone</label>
            <input
              type="text"
              placeholder="+91-8487844587"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label className="formLabel">Address</label>
            <input
              type="text"
              placeholder="Kerala | Trivandrum"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <button className="newUserButton" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
