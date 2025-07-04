import postService from "@/services/post.service";
import { useState, useEffect } from "react";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then((postList) => setPosts(postList));
  }, []);

  return {
    posts,
  };
};

export default useFetchPosts;
