import './App.css';
import { AddProduct } from './pages/AddProduct/AddProduct';
import { EditProduct } from './pages/EditProduct/EditProduct';
import { Home } from './pages/Home/Home';
import {Routes,Route,BrowserRouter} from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_product" element={<AddProduct/>} />
        <Route path="/edit_product/:id" element={<EditProduct/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;