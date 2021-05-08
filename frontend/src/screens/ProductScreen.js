import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }

    return <div>
        {loading ? <div>...Loading...</div> :
            error ? <div>{error}</div> :
                <div>
                    <div className="back-to-homepage"><Link to={"/vendor/" + product.vendor}><h3>Back To Vendorpage</h3></Link></div>
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h1>•       {product.name}</h1>
                                </li>
                                {/* <li>
                                    <h2>•        {product.rating} Stars ({product.numReviews} Reviews)</h2>
                                </li> */}
                                <li>
                                    <h2>•       Price: <b>{product.price} VND</b> </h2>
                                </li>
                                <li>
                                    <h3>{product.description}</h3>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: {product.price} VND
                            </li>
                                <li>
                                    Status: {product.countInStock > 0 ? product.countInStock + " items available" : "Unavailable"}
                                </li>
                                <li>
                                    Quanlity: <input value={qty} onChange={(e) => { setQty(e.target.value) }} />
                                </li>
                                <li>
                                    {product.countInStock > 0 && qty <= product.countInStock && <button onClick={handleAddToCart} className="button">Add To Carl</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>}
    </div>

}

export default ProductScreen;