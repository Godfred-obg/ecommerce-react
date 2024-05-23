import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import Product from './Product';

function Carousel(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1463,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [products, setProducts]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  const navigate = useNavigate();
    
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    useEffect(() => {

      const links=['https://fakestoreapi.com/products/category/electronics',
                    'https://fakestoreapi.com/products/category/jewelery',
                    'https://fakestoreapi.com/products/category/men\'s clothing',
                    'https://fakestoreapi.com/products/category/women\'s clothing']


      const fetchData = async () => {
          try {
            let url='';
            if(props.category==="electronics")
              url=links[0]
            else if(props.category==="jewelery")
              url=links[1]
            else if(props.category==="men's clothing")
              url=(links[2])
            else if(props.category==="women's clothing")
              url=(links[3])
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
  }, [props.category]);

  if (loading) {
      return <p>Loading products...</p>;
  }

  if (error) {
      return <p>Error fetching products: {error}</p>;
  }

  return (
    <div className="slider-container">
      <h4>Related Items</h4>
      <Slider {...settings}>
      {products.map((product, index) => (
                         <div key={product.id} className='carousel-cell' onClick={() => handleProductClick(product.id)}>
                         <Product
                             key={product.id}
                             image={product.image}
                             productname={product.title}
                             price={`$${product.price}`}
                         />
                     </div>
                ))}
      </Slider>
    </div>
  );
}

export default Carousel;