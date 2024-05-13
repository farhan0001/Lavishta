import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './ProcessOrder.css';
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import Sidebar from './Sidebar';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const ProcessOrder = () => {

    const { order, error, loading } = useSelector(state => state.orderDetails);
    const { error: updateError, isUpdated} = useSelector(state => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({type: UPDATE_ORDER_RESET});
            navigate('/admin/orders');
        }

        dispatch(getOrderDetails(id));

    }, [dispatch, alert, error, id, updateError, isUpdated, navigate])

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    {
                        loading || order === undefined ? <Loader /> :
                            <Fragment>
                                <div 
                                    className='confirmOrderPage'
                                    style={{
                                        display: order.orderStatus === "Delivered" ? "block" : "grid"
                                    }}
                                >
                                    <div>
                                        <div className='confirmShippingArea'>
                                            <Typography>Shipping Info</Typography>
                                            <div className='orderDetailsContainerBox'>
                                                <div>
                                                    <p>Name:</p>
                                                    <span>{order.user && order.user.name}</span>
                                                </div>
                                                <div>
                                                    <p>/phone:</p>
                                                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                                </div>
                                                <div>
                                                    <p>Address:</p>
                                                    <span>{order.shippingInfo.address &&
                                                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                                                    </span>
                                                </div>
                                            </div>

                                            <Typography>Payment</Typography>
                                            <div className='orderDetailsContainerBox'>
                                                <div>
                                                    <p className={
                                                        order.paymentInfo &&
                                                            order.paymentInfo.status === "succeeded"
                                                            ? "greeColor" : "redColor"
                                                    }>
                                                        {
                                                            order.paymentInfo &&
                                                                order.paymentInfo.status === "succeeded"
                                                                ? "PAID" : "NOT PAID"
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>Amount:</p>
                                                    <span>{order.totalPrice && order.totalPrice}</span>
                                                </div>
                                            </div>

                                            <Typography>Order Status</Typography>
                                            <div className='orderDetailsContainerBox'>
                                                <div>
                                                    <p
                                                        className={
                                                            order.orderStatus && order.orderStatus === "Delivered"
                                                                ? "greenColor" : "redColor"
                                                        }
                                                    >
                                                        {
                                                            order.orderStatus && order.orderStatus
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='confirmCartItems'>
                                            <Typography>Your Cart Items:</Typography>
                                            <div className='confirmCartItemsContainer'>
                                                {
                                                    order.orderItems && order.orderItems.map((item) => (
                                                        <div key={item.product}>
                                                            <img src={item.image} alt="Product" />
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>{" "}
                                                            <span>
                                                                {item.quantity} X ₹{item.price} = {" "}
                                                                <b>₹{item.price * item.quantity}</b>
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: order.orderStatus === "Delivered" ? "none" : "block"
                                        }}
                                    >
                                        <form
                                            className='updateOrderForm'
                                            onSubmit={updateOrderSubmitHandler}
                                        >
                                            <h1>Process Order</h1>

                                            <div>
                                                <AccountTreeIcon />
                                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="">Choose Status</option>
                                                    {
                                                        order.orderStatus === "Processing" && (
                                                            <option value="Shipped">Shipped</option>
                                                        )
                                                    }
                                                    {
                                                        order.orderStatus === "Shipped" && (
                                                            <option value="Delivered">Delivered</option>
                                                        )
                                                    }
                                                </select>
                                            </div>

                                            <Button
                                                id='updateOrderBtn'
                                                type='submit'
                                                disabled={loading ? true : false || status === "" ? true : false}
                                            >
                                                Process
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder;