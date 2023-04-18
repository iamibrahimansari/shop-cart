import {useLocation} from 'react-router-dom';

const PaymentPage = () =>{
    const location = useLocation();
    const {totalPrice} = location.state;
    return(
        <div className="payment-page">
            <h1>Pay ${totalPrice}</h1>
            <div className="div"></div>
        </div>
    )
}

export default PaymentPage;