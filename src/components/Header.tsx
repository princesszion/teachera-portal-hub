
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TeachEra</h1>
              <p className="text-sm text-gray-600">Empowering Educators Worldwide</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#opportunities" className="text-gray-700 hover:text-primary transition-colors">Opportunities</a>
            <a href="#resources" className="text-gray-700 hover:text-primary transition-colors">Resources</a>
            <a href="#community" className="text-gray-700 hover:text-primary transition-colors">Community</a>
            <a href="#awards" className="text-gray-700 hover:text-primary transition-colors">Awards</a>
            <a href="/admin" className="text-gray-700 hover:text-primary transition-colors">Admin</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">Join TeachEra</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
