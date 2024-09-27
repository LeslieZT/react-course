import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Home } from "../components/Home/Home";
import { MainLayout } from "../Layouts/MainLayout";
import { ErrorPage } from "../Pages/ErrorPage";
import { PostPage } from "../Pages/PostPage";
import { PostsPage } from "../Pages/PostsPage";
import { TasksPage } from "../Pages/TasksPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteV2 } from "./ProtectedRouteV2";
import { Login } from "../components/User/Login";
import { UserContextProvider } from "../context/userContext/userContextProvider";

const routes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Home />,
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
        // <ProtectedRoute>
          <TasksPage />
        // </ProtectedRoute>
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

export const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <UserContextProvider>
            <Login />
          </UserContextProvider>
        }
      />
      <Route path="/tasks" element={<TasksPage />}></Route>
      <Route
        path="/posts"
        element={
          <UserContextProvider>
            <ProtectedRouteV2 />
          </UserContextProvider>
        }
      >
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/posts/:id" element={<PostPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export const router = createBrowserRouter([routes]);
