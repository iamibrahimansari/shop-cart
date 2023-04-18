import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const getProducts = async () =>{
            const response = await axios.get('https://shop-cart-api.cyclic.app/products');
            setProducts(response.data);
        }
        getProducts();
    }, []);
    const navigate = useNavigate();
    const handleNavigation = id =>{
        navigate(
            '/product',
            {
                state: {
                    id: `${id}`
                }
            }
        )
    }
    return(
        products.length ?
        (
            <div className="products">
                <h1>
                    <span>
                        Products
                    </span>
                    <span className="cart" onClick={() => navigate('/cart')}>Cart</span>
                </h1>
                {
                    products.map(product =>{
                        return(
                            <div 
                                key={product._id} 
                                className="single-product" 
                                onClick={() => handleNavigation(product._id)}
                            >
                                <div className="img-container">
                                    <img src={product.imgUrl} alt="ibrahim ansari" />
                                </div>
                                <div className="name-price">
                                    <p className="name">{product.name}</p>
                                    <p className="price">${product.price}</p>
                                </div>
                            </div>            
                        )
                    })
                }
            </div>
        ) :
        <h1 className="loading">Loading...</h1>
    )
}
export default Products;