import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import mrLogo from "@/assets/mr-logo.png";
import uniportLogo from "@/assets/uniport-logo.png";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Programs", to: "/#programs" },
    { label: "Courses", to: "/courses" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  const resources = [
    { label: "Student Portal (Diploma)", href: "https://lms.odel.uniport.edu.ng/#/home" },
    { label: "Student Portal (Degree)", href: "https://odeluniport.com/" },
    { label: "UniPort Library", href: "https://www.library.uniport.edu.ng/" },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={uniportLogo} alt="UNIPORT Logo" className="h-10 w-10 object-contain" />
              <div>
                <span className="text-sm font-bold font-display block">ODeL UniPort</span>
                <span className="text-xs text-muted-foreground">Open, Distance & e-Learning</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Providing accessible, flexible, and quality education to learners across Nigeria and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-display mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold font-display mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold font-display mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  F24/5, Chinua Worlu Drive, Off Abacha Road, GRA Phase 3, Port Harcourt
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+2348030697250" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  +234 (8) 030697250
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:info@odel.uniport.edu.ng" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  info@odel.uniport.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ODeL, University of Port Harcourt. All rights reserved.
          </p>
          <a
            href="https://www.m-rinternational.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            title="MR International"
          >
            <img src={mrLogo} alt="MR International" className="h-5 w-auto object-contain" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
