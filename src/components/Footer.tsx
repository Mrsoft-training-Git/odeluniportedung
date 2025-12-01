import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ODEL UniPort</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Providing lifelong learning through quality teaching, research and innovation at the University of Port Harcourt.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">News & Events</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programmes</h3>
            <ul className="space-y-2">
              <li><Link to="/courses?category=short_course" className="text-sm text-muted-foreground hover:text-primary transition-colors">Short Courses</Link></li>
              <li><Link to="/courses?category=diploma" className="text-sm text-muted-foreground hover:text-primary transition-colors">Diploma Programmes</Link></li>
              <li><Link to="/courses?category=undergraduate" className="text-sm text-muted-foreground hover:text-primary transition-colors">Undergraduate</Link></li>
              <li><Link to="/courses?category=postgraduate" className="text-sm text-muted-foreground hover:text-primary transition-colors">Postgraduate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  University of Port Harcourt, East-West Road, Choba, Port Harcourt, Rivers State, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">odel@uniport.edu.ng</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">+234 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ODEL University of Port Harcourt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
