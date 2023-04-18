import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';

const Product = () => {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = location.state;
    useEffect(() =>{
        const getProduct = async () =>{
            try{
                const response = await axios.get(`https://shop-cart-api.cyclic.app/products/${id}`);
                setProduct(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getProduct(); 
    }, []);
    const {name, price, imgUrl, details, review} = {...product};

    const handleAddToCart = async () =>{
        try{
            await axios.post('https://shop-cart-api.cyclic.app/cart', product);
            alert('Successfully add to cart');
        }catch(error){
            console.error(error);
        }
    }
    return(
        <div className="product">
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
                <div className="btns">
                    <button onClick={() => navigate('/pay', {state: {totalPrice: `${price}`}})} type="button">Buy</button>
                    <button type="button" onClick={handleAddToCart}>Add to Cart</button>
                </div>
                <div className="details-review">
                    <div className="details">
                        <h3>Details:</h3>
                        <ul>
                            {details?.map(detail => <li>{detail}</li>)}
                        </ul>
                    </div>
                    <div className="review">
                        <h3>Review</h3>
                        <p>{review ? review === 1 ? `${review} Star` : `${review} Stars` : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;