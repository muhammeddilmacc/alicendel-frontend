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
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
//import image from '../images/blog.jpg'

const PostCard = ({
  id,
  title,
  subheader,
  image,
  content,
  comments,
  likes,
  showPosts,
  likesId,
}) => {
  const { userInfo } = useSelector((state) => state.signIn);

  //add like
  const addLike = async () => {
    try {
      const { data } = await axios.put(`/api/addlike/post/${id}`);
      // console.log("likes", data.post);
      // if (data.success == true) {
      //     showPosts();
      // }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  //remove like
  const removeLike = async () => {
    try {
      const { data } = await axios.put(`/api/removelike/post/${id}`);
      // console.log("remove likes", data.post);
      // if (data.success == true) {
      //     showPosts();
      // }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div
      key={id}
      className="h-auto  max-w-screen-xl xl:max-w-screen-2xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-6 cursor-pointer duration-200 hover:shadow-md pr-0 md:pr-4 rounded-lg"
    >
      <Link to={`/post/${id}`} className=" m-auto w-full overflow-hidden object-cover">
        <img src={image ? image : ""} className="col-span-1 object-cover h-48 sm:h-72 md:h-52  lg:h-48 w-full"></img>
      </Link>

      <div className="col-span-3 flex flex-col px-4 py-2 md:py-0 md:px-2">
        <Link to={`/post/${id}`}>
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold pb-3 ">{title}</h2>
            <p className="pb-3 text-slate-500">{subheader}</p>
          </div>
          <p className="text-md text-slate-700 line-clamp-2 h-auto">
            {content}...
          </p>
        </Link>

        <div className="flex flex-row w-full gap-5 pt-4 pb-2">
          <a className="flex flex-row gap-1 mt-[-8px] absolute z-40">
            {likesId.includes(userInfo && userInfo.id) ? (
              <IconButton
                onClick={removeLike}
                aria-label="add to favorites"
                className="mt-[-10px]"
              >
                <FavoriteIcon sx={{ color: "red" }} />
              </IconButton>
            ) : (
              <IconButton onClick={addLike} aria-label="add to favorites">
                <FavoriteBorderIcon sx={{ color: "red" }} />
              </IconButton>
            )}
            <span className="pt-2">{likes} </span>
          </a>

          <a className="flex flex-row gap-1 ml-[80px]">
            <svg
              className="w-6 h-6 duration-200 hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <span>{comments}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
