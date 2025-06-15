
import { Search, Menu, X, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import UserMenu from "@/components/auth/UserMenu";
import { useSearch } from "@/hooks/useSearch";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const { user } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    showSearchSuggestions,
    setShowSearchSuggestions,
    searchRef,
    filteredSuggestions,
    handleToolClick
  } = useSearch();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              GovtBudget<span className="text-blue-600">.com</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tools, countries, or tax calculators..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Search Suggestions */}
            {showSearchSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSearchSuggestions(false);
                        handleToolClick(suggestion);
                      }}
                    >
                      <div className="flex items-center">
                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No tools found</div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            <a href="#services" className="block text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            
            {user ? (
              <div className="pt-2">
                <UserMenu />
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup" className="flex-1">
                  <Button size="sm" className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
