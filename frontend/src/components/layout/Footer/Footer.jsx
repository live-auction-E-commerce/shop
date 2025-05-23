import SiteInfo from './SiteInfo';
import QuickLinks from './QuickLinks';
import Categories from './Categories';
import ContactInfo from './ContactInfo';

import { getCurrentYear } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className="mt-2 bg-gradient-to-r from-rose-50 to-teal-50 border-t border-gray-200">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SiteInfo />
          <QuickLinks />
          <Categories />
          <ContactInfo />
        </div>
      </div>
      <div className="bg-gradient-to-r from-rose-600 to-teal-600 py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            &copy; {getCurrentYear()} auction-site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
