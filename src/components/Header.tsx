import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, GraduationCap, BookOpen, Library } from "lucide-react";
import { useState } from "react";
import uniportLogo from "@/assets/uniport-logo.png";
import { useLmsSettings } from "@/hooks/useLmsSettings";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
    data: lmsSettings
  } = useLmsSettings();
  
  const navLinks = [{
    to: "/",
    label: "Home"
  }, {
    to: "/#about",
    label: "About Us"
  }, {
    to: "/courses",
    label: "Courses"
  }, {
    to: "/gallery",
    label: "Gallery"
  }, {
    to: "/contact",
    label: "Contact"
  }];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 md:h-20 items-center justify-between px-3 sm:px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
          <img src={uniportLogo} alt="UNIPORT Logo" className="h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14 object-contain" />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-lg font-bold text-foreground leading-tight">UNIVERSITY OF PORT HARCOURT</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Open, Distance & e-Learning Centre (ODeL)</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="text-xs xl:text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <a 
            href="https://www.library.uniport.edu.ng/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-xs xl:text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
            title="UniPort Library"
          >
            <Library className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
            <span>Library</span>
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg z-50">
              <DropdownMenuItem asChild>
                <a href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"} target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Diploma & Short Courses</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Undergraduate & Postgraduate</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden border-t border-border bg-background overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="container py-3 px-4 flex flex-col space-y-1">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setMobileMenuOpen(false)} 
              className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-2.5 px-3 rounded-md"
            >
              {link.label}
            </Link>
          ))}
          <a 
            href="https://www.library.uniport.edu.ng/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-2.5 px-3 rounded-md"
          >
            <Library className="mr-2 h-4 w-4" />
            Library
          </a>
          <div className="pt-2 mt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2 px-3">Student Portal</p>
            <a 
              href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-2.5 px-3 rounded-md"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Diploma & Short Courses
            </a>
            <a 
              href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors py-2.5 px-3 rounded-md"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Undergraduate & Postgraduate
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;