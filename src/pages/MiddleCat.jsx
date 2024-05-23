import React, { useEffect, useState } from 'react'
import Product from './Product';
import discount from './images/discount.jpg';
import { useNavigate } from 'react-router-dom';


const Middle = () => {

    const [products, setProducts]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory]=useState("All");
    const [url, setUrl]=useState('https://fakestoreapi.com/products');
    const links=['https://fakestoreapi.com/products','https://fakestoreapi.com/products/category/electronics','https://fakestoreapi.com/products/category/jewelery','https://fakestoreapi.com/products/category/men\'s clothing','https://fakestoreapi.com/products/category/women\'s clothing']


    const navigate = useNavigate();
    
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const updateList=(type)=>{
        setCategory(type);
        if(type==="All")
            setUrl(links[0]);
        else if(type==="Electronics")
            setUrl(links[1])
        else if(type==="Jewelery")
            setUrl(links[2])
        else if(type==="Men's Clothing")
            setUrl(links[3])
        else if(type==="Women's Clothing")
            setUrl(links[4])
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
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
    }, [url]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }
   
    return (
        <div className='middlecat'>
            
            <div className='category'>
            <h3>{category}</h3>
                <ul>
                <li onClick={() => updateList("All")}>All</li>
                    <li onClick={() => updateList("Electronics")}>Electronics</li>
                    <li onClick={() => updateList("Jewelery")}>Jewelry</li>
                    <li onClick={() => updateList("Men's Clothing")}>Men's clothing</li>
                    <li onClick={() => updateList("Women's Clothing")}>Women's clothing</li>
                </ul>
            </div>
            <div className='middle'>
            <h3>Available products</h3>
            <div className='products'>
                {products.map((product, index) => (
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
        </div>
        
    );
};

export default Middle;
