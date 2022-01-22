import React, { useState, useEffect, useMemo, useContext } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { AuthContext } from "../../../authContext/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import { UserContext } from "../../context/userContext/userContext";

export default function AdminHome() {
  const { user } = useContext(AuthContext);

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mat",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/api/users/stats", {
          headers: {
            token: "Bearer " + user.token,
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New user": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  console.log(userStats);
  return (
    <div className="adminHome">
      <Sidebar />
      <div className="adminHomeComponents">
        <FeaturedInfo />
        <div className="adminHomeWidgets">
          <WidgetSm />
        </div>
      </div>
    </div>
  );
}
