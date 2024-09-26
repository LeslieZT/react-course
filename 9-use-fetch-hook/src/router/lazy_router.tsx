import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
//   import { Home } from "../components/Home/Home";
//   import { MainLayout } from "../Layouts/MainLayout";
  import { ErrorPage } from "../Pages/ErrorPage";
  import { PostPage } from "../Pages/PostPage";
  import { PostsPage } from "../Pages/PostsPage";
  import { TasksPage } from "../Pages/TasksPage";
  import { ProtectedRoute } from "./ProtectedRoute";
  import { ProtectedRouteV2 } from "./ProtectedRouteV2";
  import { Login } from "../components/User/Login";
  import { UserContextProvider } from "../context/userContext/userContextProvider";
import { lazy, Suspense } from "react";
  
  const MainLayout = lazy(() => import('../Layouts/MainLayout'));
  const Home = lazy(() => import('../components/Home/Home'));


  // const PostsPage = lazy(() => import('../Pages/PostsPage'));
 // const PostPage = lazy(() => import('../Pages/PostPage'));
  
  const routes = {
    path: "/",
    element: (
        <Suspense fallback={<div>Loading...</div>}>
            <MainLayout />
        </Suspense>
    ),    
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Home />
            </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <UserContextProvider>
            <Login />
          </UserContextProvider>
        ),
      },
      //   {
      //     path: '/todos',
      //     element: <ToDos />,
      //   },
      {
        path: "/tasks",
        element: (
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/posts",
        element: (
          <UserContextProvider>
            <ProtectedRouteV2 />
          </UserContextProvider>
        ),
        children: [
          {
            path: "/posts",
            element: <PostsPage />,
          },
          {
            path: "/posts/:id",
            element: <PostPage />,
          },
        ],
      },
    ],
  };
  
  
  export const routerLazy = createBrowserRouter([routes]);
  