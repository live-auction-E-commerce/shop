import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const Footer = () => {
  return (
    <footer className="mt-2 bg-gradient-to-r from-rose-50 to-teal-50 border-t border-gray-200">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site info */}
          {/* 
          If you had to expalin what is this section, 
          consider to extract it to a new component with appropriate name 
          */}
          <div className="px-2 md:col-span-1">
            <Link to={ROUTES.HOME} className="flex items-center mb-4">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-teal-500 bg-clip-text text-transparent">
                auction-site
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              Your premier destination for fashion auctions. Bid on exclusive designer items in
              real-time.
            </p>
          </div>

          {/* Quick links */}
          {/* 
          As same as before, if you had to expalin what is this section, 
          consider to extract it to a new component with appropriate name 
          */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.LIVE} className="text-gray-600 hover:text-rose-500">
                  Live Auctions
                </Link>
              </li>
              <li>
                {/* Move navigation routes to constants in @/routes/routes_consts */}
                <Link to={ROUTES.BUY_NOW} className="text-gray-600 hover:text-rose-500">
                  Buy Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          {/* 
          As same as before, if you had to expalin what is this section, 
          consider to extract it to a new component with appropriate name 
          */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                {/* Move navigation routes to constants in a '@/routes/routes_consts file */}
                <Link to="/categories/shirts" className="text-gray-600 hover:text-rose-500">
                  Shirts
                </Link>
              </li>
              <li>
                {/* Move navigation routes to constants in @/routes/routes_consts */}
                <Link to="/categories/jeans" className="text-gray-600 hover:text-rose-500">
                  Jeans
                </Link>
              </li>
              <li>
                <Link to="/categories/shoes" className="text-gray-600 hover:text-rose-500">
                  Shoes
                </Link>
              </li>
              <li>
                {/* Move navigation routes to constants in @/routes/routes_consts */}
                <Link to="/categories/bags" className="text-gray-600 hover:text-rose-500">
                  Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          {/* 
          As same as before, if you had to expalin what is this section, 
          consider to extract it to a new component with appropriate name 
          */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@auction-site.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li>
                {/* Move navigation routes to constants in @/routes/routes_consts */}
                <Link to="/contact" className="text-gray-600 hover:text-rose-500">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-rose-600 to-teal-600 py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            {/* Date().getFullYear() can be a function in helpers.js */}
            &copy; {new Date().getFullYear()} auction-site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
