import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import { useParams } from 'react-router-dom';
import Footer from './Footer';


const ProductPage = () => {

    const params = useParams()

    const [products, setProducts]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [amount, setAmount]=useState(0);
    const [quantity, setQuantity]=useState(1);
    const [price, setPrice] = useState(0);
    const [cartquantity, setCQ] = useState(0);

    const [valuePass, setValuePass] = useState(0);

    const handleChange = () => {
      setValuePass(quantity); // Update the state with the new value from ComponentB
    };

    function createProduct(name, image, quantity, currentPrice, price) {
        return {
            name: name,
            image: image,
            quantity: quantity,
            currentPrice: currentPrice,
            price: price
        };
    }

    const addCart = () => {
        const product = createProduct(products.title, products.image, quantity, amount, products.price);
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...cartFromLocalStorage, product];
        setCQ(cartquantity + quantity);
        handleChange();
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    


    const add=()=>{
        setAmount(price*(quantity+1))
        setQuantity(quantity+1);
        
        console.log(amount)
    }
    const subtract=()=>{
        if(quantity>1){
            setQuantity(quantity-1);
            setAmount(amount-price)
        }
    }

    useEffect(() => {
        setQuantity(1)
        const fetchData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setAmount(data.price)
                setPrice(data.price);
                //console.log(price)
            } catch (error) {
                setError(error.message);
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }

   

  return (
    <div className='Home'>
        <Navbar valueFromB={valuePass} />
        <div className='product-page'>
            <h3 id='title'>{products.title}</h3>
            <div className='product-description'>
                <img id='product-image' src={products.image} alt="" />
                <div className='description'>
                    <p>{products.description}</p>
                    <div className='quantity'>
                        <h3>Quantity</h3>
                        <div className='counter'>
                            <h4 className='operator' onClick={subtract}>-</h4>
                            <h4 id='amount'>{quantity}</h4>
                            <h4 className='operator' onClick={add}>+</h4>
                        </div>
                        <h3>${parseFloat(amount).toFixed(2)}</h3>
                    </div>
                    <div className='buttons'>
                        <button id='add-to-cart' onClick={addCart}>ADD TO CART</button>
                        <button id='buy-now'>BUY NOW</button>
                    </div>
                </div>
            </div>
        </div>
        
        <Carousel 
            category={products.category}
        />
        <Footer />
    </div>
  )
}

export default ProductPage;