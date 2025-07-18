import React, {  useEffect, useState } from 'react';
import OrderApiService from '../../services/OrderApiService';


const Orders = () => {
    // const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
        const result = await OrderApiService.getAllOrders();
        if (Array.isArray(result)) {
            setData(result);
        } else {
            setData([]);
        }
    }
    const updateOrderStatus = async(event, orderId) => {
        const status = event.target.value;
        const result = await OrderApiService.updateOrderStatus(orderId, status);
        if(result.statusCode === 200){
            await fetchOrders();
        }
    }
    useEffect(() => {
        fetchOrders();
        // console.log('my daata', data);
    }, []);


    return (
        <div className="container">
            <div className="py-5 row justify-content-center">
                <div className="col-11 card table-wrapper" style={{ overflowX: "auto" }}>
                    <table className='table table-responsive'>
                        <tbody>
                            {
                                data.map((order, index) => {
                                    return (
                                        <tr key={index}>

                                            <td>
                                                <img src={order.orderedItems[0].imageUrl} alt='image' height={48} width={48} />
                                            </td>

                                            <td>
                                                <div>
                                                {order.orderedItems
                                                    .map(item => `${item.name} x ${item.quantity}`)
                                                    .join(', ')}
                                                </div>
                                                <hr></hr>
                                                <div>
                                                    {order.userAddress}
                                                </div>
                                            </td>

                                            <td>
                                                &#x20B9;{((order.amount)/100).toFixed(2)}
                                            </td>

                                            <td>
                                                Items: {order.orderedItems.length}
                                            </td>

                                            {/* <td className=''>
                                                Status: <b>{order.orderStatus.toUpperCase()}</b>
                                            </td> */}

                                            <td
                                            style={{minWidth:"150px"}}
                                            >
                                                <select name="" id="" className="form-control"
                                                    onChange={(event) =>updateOrderStatus(event, order.orderId)}
                                                    value={order.orderStatus}
                                                    >
                                                    <option value="Food Preparing">Food Preparing</option>
                                                    <option value="Out For Delivery">Out For Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
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

export default Orders;