import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return(
        <nav className="navbar">
            <h2 className="site-name">Shopping Cart</h2>
            <p>
                <span onClick={() => navigate('/')}>HOME</span>
                <span onClick={() => navigate('/cart')}>CART</span>
            </p>
        </nav>
    )
}
export default Navbar;