
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, UserCircle, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginModal from "./LoginModal";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { totalItems, setIsOpen } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "John Doe", phone: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogin = (phone: string) => {
    setIsLoggedIn(true);
    setUserInfo({ name: "John Doe", phone });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({ name: "", phone: "" });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartOpen = () => {
    setIsOpen(true);
    closeMobileMenu();
  };

  const handleLoginOpen = () => {
    window.open('https://dashboard.tapze.in/login', '_blank');
    closeMobileMenu();
  };


  useEffect(() => {
    fetch("https://tapze.in/tapzeservice/checkUser.php")
  .then(res => res.json())
  .then(data => {
    if (data.loggedIn) {
      setIsLoggedIn(true);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  });
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src="/lovable-uploads/94594e9d-7a28-429f-a567-2117c0af204a.png" 
                  alt="Tapze Logo" 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 rounded-full"
                asChild
              >
                <Link to="/buy-nfc-card">Our Products</Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 rounded-full"
                asChild
              >
                <Link to="/digital-profile">Digital Profile</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 rounded-full"
                asChild
              >
                <Link to="/about-company">About Us</Link>
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 relative rounded-full"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
              
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 rounded-full"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      {userInfo.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-200 rounded-full"
                  onClick={handleLoginOpen}
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Cart Icon */}
              <Button 
                variant="ghost" 
                size="icon"
                className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 relative rounded-full"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Hamburger Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 rounded-full"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md border-l border-border">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col space-y-4 mt-8">
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                      onClick={closeMobileMenu}
                      asChild
                    >
                      <Link to="/buy-nfc-card">Our Products</Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                      onClick={closeMobileMenu}
                      asChild
                    >
                      <Link to="/digital-profile">Digital Profile</Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                      onClick={closeMobileMenu}
                      asChild
                    >
                      <Link to="/about-company">About Us</Link>
                    </Button>
                    
                    
                    <div className="border-t border-border pt-4">
                      {isLoggedIn ? (
                        <div className="space-y-2">
                          <Button 
                            variant="ghost" 
                            className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                            onClick={closeMobileMenu}
                          >
                            <UserCircle className="w-4 h-4 mr-2" />
                            {userInfo.name}
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                            onClick={closeMobileMenu}
                          >
                            <User className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="justify-start text-foreground hover:text-foreground hover:bg-accent/80 transition-all duration-200 w-full rounded-full"
                            onClick={() => {
                              handleLogout();
                              closeMobileMenu();
                            }}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-200 w-full rounded-full"
                          onClick={handleLoginOpen}
                        >
                          Login
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navigation;
