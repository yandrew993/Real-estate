import "./SingleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
import { hotelColumns } from "../../datatablesource";

const SingleHotel = () => {
  let { postId } = useParams();
  // console.log(userId);
  //const history = useHistory();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postId) {
      console.error("No post ID provided");
      //history.push("/users"); // Redirect to users list if no userId
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <img src={post.images[0]} alt="" className="itemImg" />
                <h1 className="itemTitle">{post.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{post.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{post.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{post.city}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Datatable columns={hotelColumns} />
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
