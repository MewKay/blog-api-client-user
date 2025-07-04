import { useEffect, useState } from "react";
import postService from "@/services/post.service";
import PostItem from "./post-item/post-item";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then((postList) => setPosts(postList));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
