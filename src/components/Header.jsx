import React from 'react'
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

function header() {
  return (
    <div>
      <header>
        <div className="container mx-auto">
          <nav className='navbar flex items-center justify-between pt-3 pb-1.5'>
            <div className="navbar-brand">
              <a href="/">
                <img src="../logo.png" alt="" width="200" />
              </a>
            </div>
            <div className="mobile_icon lg:hidden">
              <img src="../assets/img/menu.svg" alt="" />
            </div>
            <div className="menu hidden lg:block">
              <ul className='flex gap-6 items-center'>
                <li>
                  <a href="/" className='font-medium text-base text-Newblack'>Help</a>
                </li>
                <li>
                  <a href="/" className='font-medium text-base text-Newblack'>Blog</a>
                </li>
                <li>
                  <a href="/" className='font-medium text-base text-Newblack'>Developer</a>
                </li>
                <li>
                  <a href="/" className='font-medium text-base text-Newblack'>Career</a>
                </li>
                <li>
                  <a href="/" className='font-medium text-base text-Newblack'>Donate</a>
                </li>
              </ul>
            </div>
            {/* <div className="login_btn gap-6 items-center hidden lg:flex">
              <a href="/login" className='font-medium text-sm tracking-tight px-7 py-2.5 capitalize bg-primary text-white rounded-full'>Get started</a>
            </div> */}
            <Stack spacing={2} direction="row" className='login_btn gap-6 items-center hidden lg:flex'>
            <Link href="/get-started" className='!font-medium text-sm tracking-tight px-7 py-2.5 capitalize bg-primary text-white rounded-full no-underline hover:bg-darkblue'>Get started</Link>
          </Stack>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default header
