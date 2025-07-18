import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ApiService from '../../services/ApiServices';

const MyOrders = () => {
    const { token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
        const result = await ApiService.fetchOrdersOfUser(token);
        if (Array.isArray(result)) {
            setData(result);
        } else {
            setData([]);
        }
    }
    useEffect(() => {
        if (token) {
            fetchOrders();
            console.log('my daata', data);
        }

    }, [token]);


    return (
        <div className="container">
            <div className="py-5 row justify-content-center">
                <div className="col-11 card">
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
                                                {order.orderedItems
                                                    .map(item => `${item.name} x ${item.quantity}`)
                                                    .join(', ')}
                                            </td>

                                            <td>
                                                &#x20B9;{((order.amount)/100).toFixed(2)}
                                            </td>

                                            <td>
                                                Items: {order.orderedItems.length}
                                            </td>

                                            <td className='fw-bold'>
                                                &#x25cf;{order.orderStatus.toUpperCase()}
                                            </td>

                                            <td>
                                                <button className='btn btn-sm btn-warning' onClick={fetchOrders}>
                                                    <i className='bi bi-arrow-clockwise'></i>
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

export default MyOrders;