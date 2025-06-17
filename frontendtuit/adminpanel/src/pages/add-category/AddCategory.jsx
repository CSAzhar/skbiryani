import React, { useEffect, useState } from "react";
import CategoryApiService from "../../services/CategoryApiService";
import { toast } from "react-toastify";
import {assets} from '../../assets/assets';

const AddCategory = () => {

    const [image, setImage] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [data, setData] = useState({
            name:'',
            description:''
        });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
        // console.log(data);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
            
                if(!image){
                        toast.error('Please select an image');
                        return;
                }
                const formData = new FormData(event.target); 
                formData.append("file", image);
                try{
                    const result =  await CategoryApiService.addCategory(formData);
                    // console.log(result);
                    if(result){
                        toast.success('Food Added successfully');
                        setData({name:'', description:''});
                        setImage(null);
                    }
                    getAllCategory();
                }catch(error){
                    toast.error('Error adding category', error);
        
                }
    }
    const getAllCategory = async () => {
        const response = await CategoryApiService.getAllCategory();
        setAllCategory(response);
    }
    useEffect( () => {
        getAllCategory();
    }, [] )

    const removeCategory = async (categoryId) => {
            let ans = confirm('Category -'+categoryId+" will be deleted");
            if(ans){
                // console.log(categoryId);
                const response = await CategoryApiService.deleteCategoryById(categoryId);
                if(response){
                    toast.success('Deleted successfully');
                    getAllCategory();
                }else{
                    toast.error('deletion failed');
                }
            }
            
        }


    return(
        <div>

        
        <div className="container mt-3 m-2">
                    <div className="row ">
                        <div className="card col-md-6">
                            <div className="card-body">
                                <h2 className="mb-4">Add Category</h2>
        
                                <form onSubmit={onSubmitHandler}>
        
                                    <div className="mb-2">
                                        <label htmlFor="image" className="form-label">
                                            <img src={image ? URL.createObjectURL(image) : assets.upload} alt="upload file" width={60}></img>
                                        </label>
                                        <input type="file" className="form-control" id="image" hidden onChange={(e) => setImage(e.target.files[0])}/>
                                    </div>
        
                                    <div className="mb-2">
                                        <label htmlFor="name" className="form-label">Item Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter Item" required name="name" onChange={onChangeHandler} value={data.name}/>
                                    </div>
        
                                    <div className="mb-2">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" rows="3" placeholder="Enter About Food" required name="description" onChange={onChangeHandler} value={data.description}/>
                                    </div>
        
                                    <button type="submit" className="btn btn-primary">Add Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
        </div>

        <div className="py-5 row justify-content-center">
            <h3 style={{textAlign:"center", color:"blue"}}>CATEGORY LIST</h3>
                <div className="col-11 card">
                    <table className="table">
                        <thead className="tr">
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allCategory.map( (item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <img src={item.imageUrl} width={60} alt="item image"/>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => removeCategory(item.id)}>Delete</button> &nbsp;
                                                
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


        </div>
    );
}

export default AddCategory;