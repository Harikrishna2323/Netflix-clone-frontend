import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./home.scss";
import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/List/List";
import { AuthContext } from "../../authContext/AuthContext";
// import StickyFooter from "../../components/footer/Footer";

const Home = ({ type }) => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://netflix-clone-hkb.herokuapp.com/api/lists${
            type ? "?type=" + type : ""
          }${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token: "Bearer " + user.token,
            },
          }
        );

        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  console.log(lists);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}

      {/* <StickyFooter /> */}
    </div>
  );
};

export default Home;
