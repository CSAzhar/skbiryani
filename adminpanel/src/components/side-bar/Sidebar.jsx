import React from "react";
import { Link } from "react-router-dom";
import {assets} from '../../assets/assets';
import './Sidebar.css'

const Sidebar = ({sidebarVisible}) => {
    return (
        <div className={`border-end bg-white ${sidebarVisible ? '' : 'd-none'}`} id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">
                <img src={assets.logo} alt="" height={30} width={30}/> &nbsp; <b style={{color:'green'}}>S K BIRYANI</b>
                </div>
            <div className="list-group list-group-flush">

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard">
                    <i className='bi bi-shop me-2'></i>  Dashboard
                </Link>

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/livefood">
                <div className="blinking-text"> <i className="bi bi-fork-knife me-2"></i>  Live Food</div>
                </Link>

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/addfood">
                    <i className="bi bi-plus-circle me-2"></i>  Add Food
                </Link>

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/addcategory">
                    <i className="bi bi-plus-circle me-2"></i>  Add Category
                </Link>

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/listfood">
                    <i className="bi bi-list-ul me-2"></i>  List Food
                </Link>

                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders">
                    <i className="bi bi-cart me-2"></i>  Orders
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;