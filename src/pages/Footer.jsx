import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
        <h3>Newsletter</h3>
        <div className='contenutore'>
            <input type="text" placeholder='email@gmail.com' />
            <button>Subscribe</button>
        </div>
        <div className='list'>
            <ul>
                <li>About</li>
                <li>Store locator</li>
                <li>FAQs</li>
                <li>News</li>
                <li>Contact Us</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer;
