import "./new.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await apiRequest.post("/auth/register", {
        username: info.username,
        email: info.email,
        password: info.password,
        isAdmin: info.isAdmin,
      });

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={info.username}
          />
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={info.email}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={info.password}
          />
          <div className="formInput">
            <label>Admin</label>
            <select id="isAdmin" onChange={handleChange} value={info.isAdmin}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
