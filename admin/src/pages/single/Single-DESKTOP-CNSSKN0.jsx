import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
import { userColumns } from "../../datatablesource";

const Single = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );
        setUser(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          isAdmin: res.data.isAdmin,
        });
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, formData);
      setUser((prevUser) => ({
        ...prevUser,
        ...formData,
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update user data", err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {editMode ? (
              <>
                <button className="saveButton" onClick={handleSave}>
                  Save
                </button>
                <h1 className="title">Edit Information</h1>
                <div className="item">
                  <img src={user.imgUrl} alt="" className="itemImg" />
                  <div className="details">
                    <div className="detailItem">
                      <span className="itemKey">Username:</span>
                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Password:</span>
                      <input
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="formInput">
                      <label>Admin</label>
                      <select
                        id="isAdmin"
                        name="isAdmin"
                        onChange={handleInputChange}
                        value={formData.isAdmin}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="editButton" onClick={handleEdit}>
                  Edit
                </div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{user.username}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{user.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Admin:</span>
                      <span className="itemValue">
                        {user.isAdmin ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Datatable columns={userColumns} />
        </div>
      </div>
    </div>
  );
};

export default Single;
