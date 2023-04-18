import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import PaymentPage from './components/PaymentPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
