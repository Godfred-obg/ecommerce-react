import React, { useEffect, useState } from 'react';
import cartbag from "./images/cart.svg";
import menu from "./images/menu(white).svg";
import menu1 from "./images/menu(black).svg";
import close from "./images/x(1).svg";
import close2 from "./images/x.svg";
import {Link} from 'react-router-dom';




const Navbar = ({ valueFromB }) => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

    const [scrolled, setScrolled] = useState(false);
    const [imageSrc, setImageSrc] = useState(menu);
    const [collapse, setCollapse] = useState(false);
    const [closing, setClosing] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const [closing2, setClosing2] = useState(false);
    const [variableA, setVariableA] = useState(0);
    const [cart, setCart]=useState(cartFromLocalStorage);
    const [total, setTotal]=useState(0);

    const removeItem = (id) => {
     
        setCart(prevCart => prevCart.filter((item, index) => index !== id));
        const updatedCart = cart.filter((item, index) => index !== id);
        
        
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };


    useEffect(() => {
        // Perform any logic needed to update variableA based on valueFromB
        if(cart.length===0)
            setTotal(0)
        setTotal(0)
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        const newTotal = cartFromLocalStorage.reduce((acc, item) => acc + item.currentPrice, 0);
        setTotal(newTotal);
      }, [cart]);
    

    useEffect(() => {
        // Perform any logic needed to update variableA based on valueFromB
        setVariableA(variableA+valueFromB);
        console.log(valueFromB)
      }, [valueFromB]);

      useEffect(() => {
        // Update the cart state whenever the local storage changes
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartFromLocalStorage);
    }, [localStorage.getItem('cart')]);
    

      

    const handleScroll = () => {
            if (window.scrollY >= 90) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
    }

    const navCollapse = () => {
        if (collapse) {
            setClosing(true);
            setTimeout(() => {
                setCollapse(false);
                setClosing(false);
            }, 400); // Match this duration with the navClose animation duration
        } else {
            setCollapse(true);
        }
    }

    const navCollapse2 = () => {
        if (collapse2) {
            setClosing2(true);
            setTimeout(() => {
                setCollapse2(false);
                setClosing2(false);
            }, 400); // Match this duration with the navClose animation duration
        } else {
            setCollapse2(true);
        }
    }
        

    window.addEventListener("scroll", handleScroll)

    useEffect(() => {
        if (scrolled) {
            setImageSrc(menu1);
        }
        else{
            setImageSrc(menu);
        }
    }, [scrolled]);

    return(
        <div className={scrolled ? 'scrolled' : 'nav'}>

            <div className={`cart-pane ${collapse2 ? 'expand2' : ''} ${closing2 ? 'close2' : ''}`}>
                <div id='top'>
                <h4>Your Shopping Cart</h4>
                <button onClick={navCollapse2} id='close-cart'><img src={close2} alt="" /></button>
                </div>
                <div className='items'>
                {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className='cart-item'>
                                <img onClick={() => removeItem(index)} id='remove' src={close2} alt="" />
                                <img src={item.image} alt={item.name} />
                                <div className='cart-details'>
                                    <h4>{item.name}</h4>
                                    <div id='price-quantity'>
                                        <h5>Quantity: {item.quantity}</h5>
                                        <h5>Price: ${item.currentPrice.toFixed(2)}</h5>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className='total'>
                    <div id='subtotal'>
                        <h4>Subtotal</h4>
                        <h4>${total.toFixed(2)}</h4>
                    </div>
                    <button id='buy-now-cart'>BUY NOW</button>
                </div>
             
            </div>
           
            <a href=""><h3>my<span>Store</span></h3></a>
            <div className="links">
                <ul>
                <li>
                    <Link to='/home'>HOME</Link>
                </li>
                <li>
                    <Link to='/categories'>CATEGORIES</Link>
                </li>
                        </ul>
                        <div id='cart'>
                        <button  onClick={navCollapse2}><img src={cartbag} alt="" /></button>
                            <h4 id='cart-number'>{cartFromLocalStorage.length.toString()}</h4>
                        </div>
                        <button id='menu' onClick={navCollapse}><img src={menu1} alt="" /></button>
                    </div>
          
            
                    
                    <div className={`collapse ${collapse ? 'expand' : ''} ${closing ? 'close' : ''}`}>
                        <div className='nav-close'>
                            <button onClick={navCollapse} id='close'><img src={close} alt="" /></button>
                        </div>
                        <ul>
                            <li>
                                <Link to='/home'>HOME</Link>
                            </li>
                            <li>
                                <Link to='/categories'>CATEGORIES</Link>
                            </li>
                        </ul>
            </div>
        </div>
    )
}
export default Navbar;