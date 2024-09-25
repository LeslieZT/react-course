import { useEffect, useState } from 'react';
const URL = 'https://jsonplaceholder.typicode.com/posts';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type CustomError = {
  message: string;
};

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string>();

  // ** OPTION 1   use fetch - then  
  /* 
  useEffect(() => {
    // component did mount
    fetch(URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ENV_API_KEY',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data)
      })
      .catch((error) => console.error(error));
  }, []);   // [post] se ejecutara el metodo cada que cambie de estado la variable posts , genera bucle infinito
  */


  // **OPTION 2  fetch -async
  async function fetchPosts<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('API get posts error');
    }
    const data: T = await response.json();
    return data;
  }

  const fetchPosts2 = async (url: string): Promise<unknown> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('API get posts error');
      }
      const data = (await response.json()) as Post[];

      if (data instanceof Array) {
        setPosts(data);
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    }
  };


  useEffect(() => {
    fetchPosts<Post[]>(URL)
      .then((data) => {
        setPosts(data);
      })
      .catch((error: CustomError) => {
        console.log(error)
        setErrors(error.message);
      });
  }, []);

  //   mal practice  debe retornar undfind o una funcion , no debe ser promesa
  //   useEffect(async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     const data = await response.json();
  //     setPost(data);
  //   }, []);



  // ----------- COMMENTS

  useEffect(() => {
    console.log('posts', posts[0]);
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${posts[0]?.id}/comments`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ENV_API_KEY',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log('comments', data);
        setComments(data);
      })
      .catch((error) => console.error(error));
  }, [posts]);

  
  
  if (errors) {
    return <div>{errors}</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment?.id}>
          {comment?.email}
          <p
            style={{
              fontWeight: 'bold',
            }}
          >
            {comment.body}
          </p>
        </div>
      ))}

      <br/>

      <ul>
        {posts.map((post, index) => (
         <li key={index}>
        
           {post.title}
         </li>
        ))}
      </ul>
    </div>
  );
};
