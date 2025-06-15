
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GovtBudget.com</h3>
            <p className="text-gray-300 text-sm">Your trusted source for country-specific government finance and taxation tools worldwide.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="#privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#tax-calc" className="text-gray-300 hover:text-white">Tax Calculator</a></li>
              <li><a href="#budget-analyzer" className="text-gray-300 hover:text-white">Budget Analyzer</a></li>
              <li><a href="#gdp-calc" className="text-gray-300 hover:text-white">GDP Calculator</a></li>
              <li><a href="#compliance" className="text-gray-300 hover:text-white">Compliance Tools</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#docs" className="text-gray-300 hover:text-white">Documentation</a></li>
              <li><a href="#api" className="text-gray-300 hover:text-white">API Access</a></li>
              <li><a href="#updates" className="text-gray-300 hover:text-white">Updates</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 GovtBudget.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
