import './App.css';
import './mediaqueries.css';
import './ProductPage.css';
import Categories from './pages/Categories';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
