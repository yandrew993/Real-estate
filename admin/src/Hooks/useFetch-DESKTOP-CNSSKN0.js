import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL_API = "http://localhost:3000/api";
const BASE_URL_USERS = "http://localhost:3000/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = endpoint === "/users" ? BASE_URL_USERS : BASE_URL_API;
        const response = await axios.get(`${baseUrl}${endpoint}`);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
