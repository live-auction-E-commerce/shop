import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes/routes_consts';

const ContactInfo = () => (
  <div>
    <h3 className="font-semibold mb-4">Contact</h3>
    <ul className="space-y-2">
      <li className="text-gray-600">Email: info@auction-site.com</li>
      <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
    </ul>
  </div>
);

export default ContactInfo;
