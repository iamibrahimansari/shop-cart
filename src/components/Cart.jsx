import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Cart = () =>{
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    useEffect(() =>{
        const getProducts = async () =>{
            try{
                const response = await axios.get('https://shop-cart-api.cyclic.app/cart');
                setCart(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getProducts();
    }, [cart]);

    const handleTotalPrice = () =>{
        let temp = 0;
        cart.forEach(product => temp += product.price);
        setTotalPrice(temp);
    }

    const handleRemovePRoduct = async id =>{
        try{
            const response = await axios.delete(`https://shop-cart-api.cyclic.app/cart/delete/${id}`);
            const temp = cart.filter(product => product._id !== response.data._id);
            alert('Product Removed');
            setCart(temp);
        }catch(error){
            console.error(error);
        }
    }

    const cartStyle={
        height: '50rem',
    }

    return(
        <div className="cart" style={{cartStyle}}>
            {
                cart.length ?
                cart.map(product => {
                    const {_id, name, price, imgUrl, details, review} = {...product};
                    return(
                        <div key={_id} className="product">
                            <div className="left">
                                <div className="img">
                                    <img src={imgUrl} alt={name} />
                                </div>
                            </div>
                            <div className="right">
                                <div>
                                    <h2 className="name">{name}</h2>
                                    <h3 className="price">${price}</h3>
                                </div>
                                <div className="details-review">
                                    <div className="details">
                                        <h3>Details:</h3>
                                        <ul>
                                            {details?.map(detail => <li key={detail}>{detail}</li>)}
                                        </ul>
                                    </div>
                                    <div className="review">
                                        <h3>Review</h3>
                                        <p>{review ? review === 1 ? `${review} Star` : `${review} Stars` : 0}</p>
                                    </div>
                                </div>
                                <div className="remove">
                                    <button onClick={() => handleRemovePRoduct(_id)} type="button">Remove from cart</button>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                <h1 className="cartEmpty">Cart is empty now</h1>
            }
            {
                cart.length ?
                <div style={{textAlign: 'center', marginBottom: '2rem'}} className="buy">
                    <button type="button" onClick={handleTotalPrice}>Total Price: {totalPrice ? `$${totalPrice}` : null}</button>
                    {
                        totalPrice ?
                        <button type="button" onClick={() => navigate('/pay', {state: {totalPrice: `${totalPrice}`}})}>Buy</button> :
                        <button style={{backgroundColor: '#eee', cursor: 'auto'}} disabled type="button" onClick={() => navigate('/pay', {state: {totalPrice: `${totalPrice}`}})}>Buy</button> 
                    }
                </div> :
                null
            }
        </div>
    )
}

export default Cart;