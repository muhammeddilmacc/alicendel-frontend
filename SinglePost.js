import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import moment from "moment";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import CommentList from "../components/CommentList";
import { io } from "socket.io-client";
import DOMPurify from "dompurify";

const socket = io("/", {
  reconnection: true,
});

const SinglePost = () => {
  const { userInfo } = useSelector((state) => state.signIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const { id } = useParams();
  //fetch single post
  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/post/${id}`);
      // console.log(data)
      setTitle(data.post.title);
      setContent(data.post.content);
      setImage(data.post.image.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(content),
  });
  useEffect(() => {
    displaySinglePost();
  }, []);

  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/comment/post/${id}`, { comment });
      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        //displaySinglePost();
        socket.emit("comment", data.post.comments);
      }
      //console.log("comment post", data.post)
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments;

  return (
    <>
      <Navbar />
        <div className="flex flex-col justify-center place-items-center h-auto pt-12 w-full px-[20%] pb-12">

            <h1 className="title font-bold text-4xl pb-3 h-auto tracking-wider leading-relaxed	subpixel-antialiased">{title}</h1>
            <div className="flex flex-row w-full pt-8 pb-6">
                <div className="w-[60px] h-[60px] rounded-full bg-red-200 text-center pt-3 text-2xl font-bold">R</div>
                <div className="flex flex-col pl-6">
                <h3 className="text-2xl font-semibold">Ahmet Aksu</h3>
                <p className="text-lg pt-1">{moment(createdAt).format("MMMM DD, YYYY")}</p>
                </div>
            </div>
            <div className=" border-t-2 border-slate-200 w-full h-auto pt-6">
                <img src={image} className="h-auto shadow-lg"></img>
                <p className="text-md tracking-wider leading-relaxed	subpixel-antialiased		pt-5">{content}</p>
            </div>

        </div>
      {/* <Footer /> */}
    </>
  );
};

export default SinglePost;

