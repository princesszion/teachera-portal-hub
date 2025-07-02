
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="text-xl font-bold">TeachEra</div>
            </div>
            <p className="text-gray-400">Empowering educators worldwide with opportunities and resources.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Opportunities</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fellowships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Advocacy Toolkit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Literacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CV Review</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Discussion Forum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Awards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TeachEra. All rights reserved. | Domain: teachEra.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
