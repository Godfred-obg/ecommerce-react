import electronics from './images/electronics.webp';
import jewelery from './images/jewelery.webp';
import mens from './images/men-clothes.webp'
import womens from './images/womens-clothes.webp';
import shop from './images/shop.jpg';

const Header = () => {
  return (
    <div className='theheader'>
        <div className='shop-banner'>
            <h3 id='shop-title'>Come Shop With Us.</h3>
            <img id='shop' src={shop} alt="" />
        </div>
        
        <div className='header'>
        <div className='container'>
            <img id='header-img' src={electronics} alt="" />
            <h4>Electronics</h4>
        </div>
        <div className='container'>
            <img id='header-img' src={jewelery} alt="" />
            <h4>Jewelery</h4>
        </div>
        <div className='clothes'>
        <div className='container'>
            <img id='header-img' src={mens} alt="" />
            <h4>Men's Clothing</h4>
        </div>
        <div className='container'>
            <img id='header-img' src={womens} alt="" />
            <h4>Women's Clothing</h4>
        </div>
        </div>
        </div>
        
    </div>
  )
}

export default Header