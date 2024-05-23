import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import discount from './images/discount.jpg';

    const Middle = () => {
                                                                            
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }
   
    const first12Products = products.slice(0, 12);
    const remainingProducts = products.slice(12);

    return (
        <div className='middle'>
            <h3>Available products</h3>
            <div className='products'>
                {first12Products.map((product, index) => (
                    <div onClick={() => handleProductClick(product.id)}>
                        <Product
                            key={product.id}
                            image={product.image}
                            productname={product.title}
                            price={`$${product.price}`}
                        />
                    </div>
                ))}
                </div>
                
                <div className='annuncio'>
                    <div>
                        <h4>Discount Sale</h4>
                        <p>Explore our newest deals and discounts now available for a limited time only. Don’t miss out!</p>
                        <button>CHECK OUT</button>
                    </div>
                    <img src={discount} alt="" />
                </div>

              <div className='products'>
                {remainingProducts.map(product => (
                    <div onClick={() => handleProductClick(product.id)}>
                        <Product
                        key={product.id}
                        image={product.image}
                        productname={product.title}
                        price={`$${product.price}`}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Middle;
