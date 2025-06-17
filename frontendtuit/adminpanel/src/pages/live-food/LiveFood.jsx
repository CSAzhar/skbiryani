import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LiveFoodApi from "../../services/LiveFoodApi";
import './LiveFood.css'
import ApiService from "../../services/FoodApiService";

const LiveFood = () => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await ApiService.getAllFood();
        // console.log(response);
        if (response) {
            setList(response);
            // console.log(response);
        } else {
            toast.error('Error while loading foods');
        }
    }

    // const fetchList = async () => {
    //     const response = await LiveFoodApi.getLiveFoods();
    //     console.log(response);
    //     if (response) {
    //         setList(response);
    //         // console.log(response);
    //     } else {
    //         toast.error('Error while loading foods');
    //     }
    // }

    // const removeFoodItem = async (foodId) => {
    //     let ans = confirm('food item -'+foodId+" will be deleted");
    //     if(ans){
    //         console.log(foodId);
    //         const response = await ApiService.deleteFoodById(foodId);
    //         if(response){
    //             toast.success('Deleted successfully');
    //             fetchList();
    //         }else{
    //             toast.error('deletion failed');
    //         }
    //     }

    // }
    const hideShowItem = async (foodId) => {
        const updatedList = list.map(item => {
            if (item.id === foodId) {
                return { ...item, isActive: !item.isActive };
            }
            return item;
        });
    
        const food = list.find(item => item.id === foodId);
    
        try {
            const response = await LiveFoodApi.toggleFoodItem(foodId);
            if (response) {
                const toggleToast = food.isAvailable;
                if(toggleToast===true){
                    toast.info('Food item disabled')
                }else{
                    toast.success('Food item enabled');
                }
                setList(updatedList);
                fetchList();
            } else {
                toast.error("Failed to update food status");
            }
        } catch (error) {
            toast.error("API error while updating food status", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, [])


    return (
        <div className="main-livefood-container">

            <div className="container">
                <h1 className="text-red blink-hard">LIVE FOOD ON PORTAL</h1>
                {/* <h1 className="text-red blink-soft">Soft Blink</h1>   */}
            </div> 
            <div className="py-1 row justify-content-center">
                <div className="col-11 card">
                    <table className="table">
                        <thead className="tr">
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <img className="livefoodimg" src={item.imageUrl} alt="item photo" ></img>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.category.name}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => hideShowItem(item.id)}>
                                                    <div>

                                                        <label className="switch">
                                                            <input className="checkbox" 
                                                                    type="checkbox" 
                                                                    checked={item.isAvailable}
                                                                    readOnly />
                                                            <svg
                                                                className="svg"
                                                                width="24px"
                                                                height="24px"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <ellipse
                                                                    className="svg-dot"
                                                                    cx="6"
                                                                    cy="6"
                                                                    rx="2"
                                                                    ry="1"
                                                                    fill="#fff"
                                                                    transform="rotate(-45,6,6)"
                                                                ></ellipse>
                                                                <circle
                                                                    className="svg-ring"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="6"
                                                                    fill="none"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeDasharray="0 5 27.7 5"
                                                                    strokeDashoffset="0.01"
                                                                    transform="rotate(-90,12,12)"
                                                                ></circle>
                                                                <line
                                                                    className="svg-line"
                                                                    x1="12"
                                                                    y1="6"
                                                                    x2="12"
                                                                    y2="15"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeDasharray="9 9"
                                                                    strokeDashoffset="3"
                                                                ></line>
                                                                <line
                                                                    className="svg-line"
                                                                    x1="12"
                                                                    y1="6"
                                                                    x2="12"
                                                                    y2="12"
                                                                    stroke="#fff"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeDasharray="6 6"
                                                                    strokeDashoffset="6"
                                                                ></line>
                                                            </svg>
                                                            <span className="slider"></span>
                                                        </label>

                                                    </div>
                                                </button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default LiveFood;
