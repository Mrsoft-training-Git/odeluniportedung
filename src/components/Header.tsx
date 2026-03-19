import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import uniportLogo from "@/assets/uniport-logo.png";
import { useLmsSettings } from "@/hooks/useLmsSettings";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: lmsSettings } = useLmsSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (to: string, e: React.MouseEvent) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const hash = to.slice(1);
      if (location.pathname === "/") {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(to);
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/#about", label: "About" },
    { to: "/#programs", label: "Programs" },
    { to: "/#features", label: "Features" },
    { to: "/courses", label: "Courses" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={uniportLogo}
            alt="UNIPORT Logo"
            className="h-9 w-9 md:h-11 md:w-11 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold font-display text-foreground leading-tight">
              ODeL UniPort
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground leading-tight hidden sm:block">
              Open, Distance & e-Learning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(link.to, e)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
            >
              {link.label}
            </Link>
          ))}

          {/* Portal Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPortalOpen(!portalOpen)}
              onBlur={() => setTimeout(() => setPortalOpen(false), 150)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50 flex items-center gap-1"
            >
              Portal
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${portalOpen ? "rotate-180" : ""}`} />
            </button>
            {portalOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 glass-strong rounded-xl shadow-xl p-2 animate-fade-in">
                <a
                  href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground">Diploma & Short Courses</span>
                  <span className="block text-xs mt-0.5">Access certificate programs</span>
                </a>
                <a
                  href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground">Undergraduate & Postgraduate</span>
                  <span className="block text-xs mt-0.5">Access degree programs</span>
                </a>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"} target="_blank" rel="noopener noreferrer">
              Sign In
            </a>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-hover" asChild>
            <Link to="/courses">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden glass-strong overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container py-4 px-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleNavClick(link.to, e)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors py-3 px-4 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border mt-2 pt-3 space-y-1">
            <p className="text-xs text-muted-foreground px-4 mb-2">Student Portal</p>
            <a
              href={lmsSettings?.diplomaShortCourses || "https://lms.odel.uniport.edu.ng/#/home"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors py-3 px-4 rounded-lg"
            >
              Diploma & Short Courses
            </a>
            <a
              href={lmsSettings?.undergraduatePostgraduate || "https://odeluniport.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors py-3 px-4 rounded-lg"
            >
              Undergraduate & Postgraduate
            </a>
          </div>
          <div className="pt-3 px-4">
            <Button className="w-full" size="sm" asChild>
              <Link to="/courses">Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
