import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";

const BASE_URL_API = "http://localhost:3000/api";
const BASE_URL_USERS = "http://localhost:3000/api";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const baseUrl = path === "users" ? BASE_URL_USERS : BASE_URL_API;
      await axios.delete(`${baseUrl}/${path}/${id}`);
      setList(list.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const userId = params.row.id;
        // if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        //   console.error("Invalid user ID format");
        //   return null; // Handle invalid ID scenario
        // }
        return (
          <div className="cellAction">
            <Link to={`/${path}/${userId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(userId)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Datatable;
