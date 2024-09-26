import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const URL = "https://jsonplaceholder.typicode.com/posts";

export const Posts = () => {
  const { data: posts, errors, loading } = useFetch({ url: URL });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>{errors}</div>;
  }

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li>
            <Link to={`${post.id}`} key={post.id}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
