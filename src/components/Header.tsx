import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, GraduationCap, BookOpen, Library } from "lucide-react";
import { useState } from "react";
import uniportLogo from "@/assets/uniport-logo.png";
import { useLmsSettings } from "@/hooks/useLmsSettings";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    data: lmsSettings
  } = useLmsSettings();
  const navLinks = [{
    to: "/",
    label: "Home"
  }, {
    to: "/about",
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
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={uniportLogo} alt="UNIPORT Logo" className="h-14 w-14 object-contain" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">UNIVERSITY OF PORT HARCOURT</span>
            <span className="text-xs text-muted-foreground">Open, Distance & e-Learning Centre</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => <Link key={link.to} to={link.to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>)}
          
          <a href="https://www.library.uniport.edu.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" title="UniPort Library">
            <Library className="h-4 w-4" />
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
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && <div className="md:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col space-y-3">
            {navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                {link.label}
              </Link>)}
            <a href="https://www.library.uniport.edu.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
              <Library className="mr-2 h-4 w-4" />
              Library
            </a>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Student Portal</p>
              <a href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                <BookOpen className="mr-2 h-4 w-4" />
                Diploma & Short Courses
              </a>
              <a href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2">
                <GraduationCap className="mr-2 h-4 w-4" />
                Undergraduate & Postgraduate
              </a>
            </div>
          </nav>
        </div>}
    </header>;
};
export default Header;