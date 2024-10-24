import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Protected from './Protected';
import Login from './Login';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Register from './Register';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected element={<AddProduct />} />} />
          <Route path="/update/:id" element={<Protected element={<UpdateProduct />} />} />
          <Route path="/" element={<Protected element={<ProductList />} />} />
          <Route path="/search/:searchTerm" element={<Protected element={<SearchProduct />} />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
