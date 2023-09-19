import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("/", {
  reconnection: true,
});

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postAddLike, setPostAddLike] = useState([]);
  const [postRemoveLike, setPostRemoveLike] = useState([]);
  const { section } = useSelector((state) => state.section);
  //display posts

  const showPosts = async (section) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/feed/${section.toLowerCase()}`);
      setPosts(data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
      setPosts([]);

    }
  };

  useEffect(() => {
    showPosts(section);
  }, [section]);

  useEffect(() => {
    socket.on("add-like", (newPosts) => {
      setPostAddLike(newPosts);
      setPostRemoveLike("");
    });
    socket.on("remove-like", (newPosts) => {
      setPostRemoveLike(newPosts);
      setPostAddLike("");
    });
  }, []);

  let uiPosts =
    postAddLike.length > 0
      ? postAddLike
      : postRemoveLike.length > 0
      ? postRemoveLike
      : posts;

  return (
    <div className="h-full w-full fixed bg-slate-50 overflow-scroll">
      <Navbar />
      <h3 className="text-3xl text-center text-slate-800 pt-12">{section}</h3>
      <div className="w-auto h-auto flex flex-col pt-12 gap-12 px-8 sm:px-24 md:px-16 lg:px-36 pb-12 bg-slate-50 grid place-content-center">
        {uiPosts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            image={post.image ? post.image.url : ""}
            subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
            comments={post.comments.length}
            likes={post.likes.length}
            likesId={post.likes}
            showPosts={showPosts}
          />
        ))}
      </div>
    </div>
  );
};

/*
<Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid className='grid grid-cols-1 justify-content-center'>

                            {
                                loading ? <Loader /> :

                                    uiPosts.map((post, index) => (
                                        <Box item xs={2} sm={4} md={4} key={index} >
                                            <PostCard
                                                id={post._id}
                                                title={post.title}
                                                content={post.content}
                                                image={post.image ? post.image.url : ''}
                                                subheader={moment(post.createdAt).format('MMMM DD, YYYY')}
                                                comments={post.comments.length}
                                                likes={post.likes.length}
                                                likesId={post.likes}
                                                showPosts={showPosts}
                                            />
                                        </Box>
                                    ))
                            }

                        </Grid>
                    </Box>

                </Container>
                <Footer />
            </Box>



              <a
            href={`/post/${post._id}`}
            key={post._id}
            className="h-auto w-auto shadow-sm grid grid-cols-4 gap-8 cursor-pointer duration-200 hover:shadow-md pr-4"
          >
            <img
              src={post.image ? post.image.url : ""}
              className="col-span-1"
            ></img>
            <div className="col-span-3 flex flex-col">
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-bold pb-3 ">{post.title}</h2>
                <p className="pb-3 text-slate-500">
                  {moment(post.createdAt).format("MMMM DD, YYYY")}
                </p>
              </div>
              <p className="text-md text-slate-700 line-clamp-3 h-auto">
                {post.content.slice(0, 400)}...
              </p>
              <div className="flex flex-row w-full gap-5 pt-3 pb-2">
                <a className="flex flex-row gap-1">
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
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                  <span>{post.likes.length}
                  </span>
                </a>

                <a className="flex flex-row gap-1">
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
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                    />
                  </svg>

                  <span>2</span>
                </a>

                <a className="flex flex-row gap-1">
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
                  <span>{post.comments.length}</span>
                </a>
              </div>
            </div>
          </a>
*/
export default Home;
