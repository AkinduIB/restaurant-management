import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <PrivateRouter><Menu/> </PrivateRouter>
      },
      
      {
        path: "/cart-page",
        element: <CartPage/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      },
      {
       path: "/process-checkout" ,
       element: <Payment/>
      }
    ]
  },

  {
    path: "/signup",
    element: <Signup />
  },

  {
    path: "/login",
    element: <Login />
  },

  //admin routes
  {
    path: "dashboard",
    element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "add-menu",
        element: <AddMenu/>
      },
      {
        path: "manage-items",
        element: <ManageItems/>
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu/>,
        loader: ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)
      }

    ]

  }
]);

export default router;