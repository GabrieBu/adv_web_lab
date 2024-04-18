import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./loaders/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLayout = lazy(() => import("./ui/AdminLayout"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const ProtectedRouteUser = lazy(() => import("./pages/ProtectedRouteUser"));
const ProtectedRouteAdmin = lazy(() => import("./pages/ProtectedRouteAdmin"));
const Register = lazy(() => import("./pages/Register"));
const LoginAdmin = lazy(() => import("./pages/LoginAdmin"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const Order = lazy(() => import("./pages/Order"));
const ProfileLayout = lazy(() => import("./ui/ProfileLayout"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="order" element={<Order />} />
            <Route path="register" element={<Register />} />
            <Route path="loginadmin" element={<LoginAdmin />} />
            <Route path="update" element={<UpdatePassword />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              element={
                <ProtectedRouteUser>
                  <Profile />
                </ProtectedRouteUser>
              }
            >
              <Route path="profile" element={<Profile />}>
                <Route index element={<ProfileLayout />} />
              </Route>
            </Route>
            <Route
              element={
                <ProtectedRouteAdmin>
                  <Admin />
                </ProtectedRouteAdmin>
              }
            >
              <Route path="admin" element={<Admin />}>
                <Route index element={<AdminLayout />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
