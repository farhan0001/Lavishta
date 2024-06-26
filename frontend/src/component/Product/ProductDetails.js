import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetails.css";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Reviewcard from "./Reviewcard.js";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from '../../actions/cartAction.js';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating
} from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector(state => state.newReview);
    const { id } = useParams();
    const alert = useAlert();

    const options = {
        size: 'normal',
        value: product.rating,
        readOnly: true,
        precision: 0.5
    }

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if(product.stock <= quantity)
            return;
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if(quantity <= 1)
            return;
        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added to Cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            return;
        }

        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
            return;
        }

        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }

        dispatch(getProductDetails(id));
        
    }, [dispatch, id, alert, error, reviewError, success])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${product.name}`} />
                    <div className='productDetails'>
                        <div className='caro'>

                            <Carousel className='carouselImage'>
                                {
                                    product.images && product.images.map((item, i) =>
                                        <img
                                            key={item.url}
                                            src={item.url}
                                            alt={`Slide-${i}`}
                                        />
                                    )
                                }

                            </Carousel>
                        </div>
                        <div className='product-desc'>
                            <div className='detailsBlock-1'>
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className='detailsBlock-2'>
                                <Rating {...options} />
                                <span className='detailsBlock-2-span'>({product.numOfReviews === 0 ? "No Review" : (product.numOfReviews === 1 ? "1 Review" : product.numOfReviews + " Reviews")})</span>
                            </div>
                            <div className='detailsBlock-3'>
                                <h1>{`₹${product.price}`}</h1>
                                <div className='detailsBlock-3-1'>
                                    <div className='detailsBlock-3-1-1'>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} type="number"></input>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status: 
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-4'>
                                <div>Description:</div> <p>{product.description}</p>
                            </div>
                            <button className='submitReview' onClick={submitReviewToggle} >Submit Review</button>
                        </div>
                    </div>
                    <h1 className='reviewsHeading'>REVIEWS</h1>

                    <Dialog
                        aria-labelledby='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialog'>
                            <Rating
                                onChange={(e) => setRating(Number(e.target.value))}
                                value={rating}
                                size='normal'
                            />
                            <textarea
                                className='submitDialogTextArea'
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                            <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {
                                product.reviews && product.reviews.map(review => <Reviewcard key={review._id} review={review} />)
                            }
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </Fragment>
            }
        </Fragment>
    )
}

export default ProductDetails