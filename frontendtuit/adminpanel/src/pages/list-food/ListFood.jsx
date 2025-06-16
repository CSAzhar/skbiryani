import React, { useEffect, useState } from "react";
import ApiService from "../../services/FoodApiService";
import { toast } from "react-toastify";

const ListFood = () => {
    const [list, setList] = useState([]);

    const fetchList = async() => {
        const response = await ApiService.getAllFood();
        if(response){
            setList(response);
            // console.log(response);
        }else{
            toast.error('Error while loading foods');
        }
    }

    const removeFoodItem = async (foodId) => {
        let ans = confirm('food item -'+foodId+" will be deleted");
        if(ans){
            console.log(foodId);
            const response = await ApiService.deleteFoodById(foodId);
            if(response){
                toast.success('Deleted successfully');
                fetchList();
            }else{
                toast.error('deletion failed');
            }
        }
        
    }
    
    useEffect( () => {
        fetchList();
    }, [] )

    return (

        <>
            <div className="py-5 row justify-content-center">
                <div className="col-11 card">
                    <table className="table">
                        <thead className="tr">
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map( (item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>
                                                <img src={item.imageUrl} alt="item photo" height={50}></img>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => removeFoodItem(item.id)}>Delete</button> &nbsp;
                                                
                                                <button className="btn btn-primary">Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        
        </>
    );
}

export default ListFood;