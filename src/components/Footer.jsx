import React from 'react'
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link'


function Footer() {
  return (
    <div>
      <footer className='bg-black py-5 px-2 gap-6 md:gap-0 md:px-0 md:py-51 text-left'>
        <div className="container mx-auto">
          <div className="main-footer flex flex-col md:flex-row justify-between">
            <div className="footer_widget footer-widget1">
              <div className="footer_logo flex flex-col gap-3">
                <a href="/" className='inline-block'>
                  <img src="../logo-white.png" alt="" width={'250'} />
                </a>
                <p className='text-white text-left font-normal text-base max-w-27'>Our app offers secure, end-to-end encrypted messaging and calls, similar to Gatsbychat, ensuring your privacy and data protection with a user-friendly interface.</p>
              </div>
              <div className="social_icon flex gap-4 mt-4">
                <Link href="/">
                  <img src="../assets/img/facebook.svg" alt="" />
                </Link>
                <Link href="/">
                  <img src="../assets/img/twitter-x.svg" alt="" />
                </Link>
                <Link href="/">
                 <img src="../assets/img/instagram.svg" alt="" />
                </Link>
                <Link href="/">
                  <img src="../assets/img/youtube.svg" alt="" />
                </Link>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              <div className="footer_widget footer-widget2">
                <div className="footer_content">
                  <h3 className='text-white font-bold text-lg'>Organization</h3>
                  <ul className='footer_nav'>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Donate</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Career</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Blog</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Term & Condition</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="../privacy-policy.pdf" target='_blank' className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footer_widget footer-widget3">
                <div className="footer_content">
                  <h3 className='text-white font-bold text-lg'>Help</h3>
                  <ul className='footer_nav'>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Support Center</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>Community</Link>
                    </li>
                    <li className='nav_link'>
                      <Link href="/" className='nav_item no-underline text-base text-white text-left py-2 inline-block hover:text-primary'>FAQ</Link>
                    </li>

                  </ul>
                </div>
              </div>
              <div className="footer_widget footer-widget4">
                <div className="subscribe">
                  <h3 className='text-white font-bold text-lg'>Subscribe</h3>
                  <form action="" className='my-2 flex relative'>
                    <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    fullWidth
                    InputProps={{
                      className: 'bg-white p-2 rounded-md',
                      sx: {
                        '& input': {
                          padding: '0 30px 0 0 ', 
                          backgroundColor: 'white',
                        },
                      },
                    }}
                    
                    />
                    <button className='absolute right-2 top-2.5'><img src="../assets/img/send.svg" alt="" className="w-5 h-5" /></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
