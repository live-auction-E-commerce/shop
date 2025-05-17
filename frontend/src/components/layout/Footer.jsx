import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-2 bg-gradient-to-r from-rose-50 to-teal-50 border-t border-gray-200">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site info */}
          <div className="px-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
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
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/live-auctions" className="text-gray-600 hover:text-rose-500">
                  Live Auctions
                </Link>
              </li>
              <li>
                <Link to="/buy-now" className="text-gray-600 hover:text-rose-500">
                  Buy Now
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-rose-500">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/shirts" className="text-gray-600 hover:text-rose-500">
                  Shirts
                </Link>
              </li>
              <li>
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
                <Link to="/categories/bags" className="text-gray-600 hover:text-rose-500">
                  Bags
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@auction-site.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li>
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
            &copy; {new Date().getFullYear()} auction-site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
