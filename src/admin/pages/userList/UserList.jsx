import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userData } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/userContext";
import axios from "axios";
import { AuthContext } from "../../../authContext/AuthContext";

export default function UserList() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get("/api/users/", {
        headers: {
          token: "Bearer " + user.token,
        },
      });
      setData(data);
    };
    getAllUsers();
  }, [user]);

  console.log("users:", data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.profilePic}
              alt="random"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/user/" + params.row.id, user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
