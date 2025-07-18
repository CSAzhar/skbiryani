import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/add-food/AddFood";
import ListFood from "./pages/list-food/ListFood";
import Orders from "./pages/orders/Orders";
import Sidebar from "./components/side-bar/Sidebar";
import Menubar from "./components/menu-bar/Menubar";
import DashBoard from "./pages/dash-board/DashBoard";
import { ToastContainer} from 'react-toastify';
import LiveFood from "./pages/live-food/LiveFood";
import AddCategory from "./pages/add-category/AddCategory";


const App = () => {

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }

  return (

    <div className="d-flex" id="wrapper">

      <Sidebar sidebarVisible={sidebarVisible}/>

      <div id="page-content-wrapper">
        <ToastContainer />

        <Menubar toggleSidebar={toggleSidebar}/>

        <div className="container-fluid">
          <Routes>
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='livefood' element={<LiveFood />}/>
            <Route path='/addfood' element={<AddFood />} />
            <Route path='/addcategory' element={<AddCategory />}/>
            <Route path='/listfood' element={<ListFood />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/' element={<DashBoard />} />
          </Routes>

        </div>

      </div>

    </div>
  );
}

export default App;