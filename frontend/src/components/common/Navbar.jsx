import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '/images/logo-devlinks-large.svg'
import MobileLogo from '/images/logo-devlinks-small.svg'
import LinkIcon from '/images/icon-links-header.svg'
import ProfileIcon from '/images/icon-profile-details-header.svg'
import EyeIcon from '/images/icon-preview-header.svg'

const Navbar = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <section className="p-[24px] bg-neutral-100">
      <nav className="w-full border-b md:border-0 sticky top-0 bg-white rounded-md z-[999] p-[16px] pl-[24px]">
        <div className="items-center max-w-screen-2xl mx-auto flex">
          <div>
            <Link to="/links">
              <img src={Logo} alt="DevLinks Logo" className="sm:block hidden w-[146px] h-[32px]" />
            </Link>
            <Link to="/">
              <img src={MobileLogo} alt="Mobile Logo" className="block sm:hidden w-[32px] h-[32px]" />
            </Link>
          </div>
          <div className="flex-1 justify-self-center block justify-center text-center">
            <div className="w-max flex lg:gap-[16px] mx-auto text-neutral-700 font-medium">
              <Link
                to="/links"
                className={`flex gap-[8px] items-center px-[16px] sm:px-[27px] py-[11px] rounded hover:text-primary duration-200 font-semibold active:scale-95 ${
                  pathname === '/links' ? 'text-primary bg-primary-200' : ''
                }`}
              >
                <img src={LinkIcon} className="size-[20px]" />
                <p className="hidden sm:block">Links</p>
              </Link>
              <Link
                to="/profile"
                className={`flex gap-[8px] items-center px-[16px] sm:px-[27px] py-[11px] rounded hover:text-primary duration-200 font-semibold active:scale-95 ${
                  pathname === '/profile' ? 'text-primary bg-primary-200' : ''
                }`}
              >
                <img src={ProfileIcon} className="size-[20px]" />
                <p className="hidden sm:block">Profile Details</p>
              </Link>
            </div>
          </div>

          <Link
            to="/preview"
            className="py-[11px] px-[16px] flex gap-[8px] items-center font-semibold rounded text-base text-primary border border-primary hover:bg-primary-200 active:scale-95 duration-200"
          >
            <img src={EyeIcon} className="size-[20px] block sm:hidden" />
            <p className="hidden sm:block">Preview</p>
          </Link>
        </div>
      </nav>
    </section>
  )
}

export default Navbar
