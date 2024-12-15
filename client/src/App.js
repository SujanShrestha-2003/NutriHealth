import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

/** import all components */
import Username from "./pages/Username";
import Password from "./pages/Password";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Recovery from "./pages/Recovery";
import Reset from "./pages/Reset";
import PageNotFound from "./pages/PageNotFound";
import StartingPage from "./pages/StartingPage";
import LandingPage from "./pages/LandingPage";
import FloatingShape from "./components/FloatingShape";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirector />,  // This will handle the redirect logic
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/starting",
    element: <StartingPage />,
  },
  {
    path: "/username",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

/**
 * This component ensures users are redirected properly.
 */
function RootRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenStartingPage = sessionStorage.getItem("hasSeenStartingPage");

    if (hasSeenStartingPage) {
      // If user has seen the StartingPage, always redirect to LandingPage
      navigate("/landing");
    } else {
      // If not, show the StartingPage
      navigate("/starting");
    }
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <main>
      {/* Floating shapes */}
      <FloatingShape
        color="bg-blue-300"
        size="w-64 h-64"
        top="10%"
        left="5%"
        delay={0}
      />{" "}
      <FloatingShape
        color="bg-indigo-500"
        size="w-48 h-48"
        top="20%"
        left="75%"
        delay={5}
      />{" "}
      <FloatingShape
        color="bg-violet-500"
        size="w-32 h-32"
        top="70%"
        left="25%"
        delay={2}
      />
      {/* Router Provider */}
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
