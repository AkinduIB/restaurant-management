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
import Order from "../pages/dashboard/Order";
import ManageBooking from "../pages/dashboard/admin/ManageBooking";
import Offer from "../pages/dashboard/Offer";
import ManageOffer from "../pages/dashboard/admin/ManageOffer";
import ManageGallery from "../pages/dashboard/admin/ManageGallery";
import Gallery from "../pages/dashboard/Gallery";


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
        element: <PrivateRouter><Menu /> </PrivateRouter>
      },

      {
        path: "/cart-page",
        element: <CartPage />
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      },
      {
        path: "/process-checkout",
        element: <Payment />
      },
      {
        path: "/order",
        element: <Order/>
      },
      {
        path: "/offer",
        element: <Offer/>
      },
      {
        path: "/gallery",
        element: <Gallery />
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
    element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "add-menu",
        element: <AddMenu />
      },
      {
        path: "manage-items",
        element: <ManageItems />
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) => fetch(`http://localhost:6001/menu/${params.id}`)
      },
      {
        path:"manage-booking",
        element: <ManageBooking />
      },
      {
        path: "manage-offers",
        element: <ManageOffer />
      },
      {
        path: "manage-gallery",
        element: <ManageGallery/>
      }

    ]

  }
]);

export default router;