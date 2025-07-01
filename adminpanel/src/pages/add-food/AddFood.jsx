import React, { useEffect, useState } from "react";
import {assets} from '../../assets/assets';
import ApiService from "../../services/FoodApiService";
import { toast } from "react-toastify";
import CategoryApiService from "../../services/CategoryApiService";

const AddFood = () => {

    const [image, setImage] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [data, setData] = useState({
        name:'',
        description:'',
        price:'',
        categoryId:''
    });
    const getAllCategory = async () => {
            const response = await CategoryApiService.getAllCategory();
            setAllCategory(response);
    }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
     
    }
    // useEffect(() => {
    //     console.log(data);
    // }), [data];
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if(!image){
            toast.error('Please select an image');
            return;
        }

        const formData = new FormData(event.target);
        formData.append("file", image);
        try{
            const result =  await ApiService.addFood(formData);
            // console.log(result);
            if(result.statusCode === 200){
                toast.success('Food Added successfully');
                setData({name:'', description:'', categoryId:'', price:''});
                setImage(null);
            }
        }catch(error){
            toast.error('Error adding food', error);

        }
    }
    useEffect( () => {
            getAllCategory();
    }, [] )

    return (
        <div className="container mt-3 m-2">
            <div className="row ">
                <div className="card col-md-6">
                    <div className="card-body">
                        <h2 className="mb-4">Add Food</h2>

                        <form onSubmit={onSubmitHandler}>

                            <div className="mb-2">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt="upload file" width={100}></img>
                                </label>
                                <input type="file" className="form-control" id="image" hidden onChange={(e) => setImage(e.target.files[0])}/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Item Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Item" required name="name" onChange={onChangeHandler} value={data.name}/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="message" className="form-label">Description</label>
                                <textarea className="form-control" id="description" rows="3" placeholder="Enter About Food" required name="description" onChange={onChangeHandler} value={data.description}/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" required name="price" placeholder='&#8377; Price'  onChange={onChangeHandler} value={data.price}/>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select name="categoryId" id="categoryId" className="form-control" onChange={onChangeHandler} value={data.categoryId}>
                                    <option value="">Select Category</option>
                                    {allCategory.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Add Food</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFood;