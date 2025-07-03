import { useEffect, useState } from "react";
import postService from "@/services/post.service";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then((postList) => setPosts(postList));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <p>
            by @{post.author.username} at {post.created_at}
          </p>
          <p>{post.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
