import { MapPin, Phone, Mail } from "lucide-react";
import mrLogo from "@/assets/mr-logo.png";

const Footer = () => {
  const offices = [
    {
      address: "F24/5, Chinua Worlu Drive, Off Abacha Road, GRA Phase 3, Port Harcourt, Nigeria.",
      phones: ["+234 (8) 030697250", "+234 (7) 010511998"],
      emails: ["info@odel.uniport.edu.ng", "support@odel.uniport.edu.ng"]
    },
    {
      address: "University of Port Harcourt, P.M.B. 5323, East-West Road, Choba, Port Harcourt, Nigeria.",
      phones: ["+234 (8) 153239667"],
      emails: ["info@odel.uniport.edu.ng", "support@odel.uniport.edu.ng"]
    },
    {
      address: "University of Port Harcourt Liaison Office, 23 Bush Street Mende Maryland, Lagos, Nigeria.",
      phones: ["+234 (8) 023415448"],
      emails: ["support@odel.uniport.edu.ng", "info@odel.uniport.edu.ng"]
    },
    {
      address: "University of Port Harcourt Liaison Office, 23 Bush Street Mende Maryland, Lagos, Nigeria.",
      phones: ["+234 (8) 023415448"],
      emails: ["info@odel.uniport.edu.ng", "support@odel.uniport.edu.ng"]
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8 md:mb-10">Contact us</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {offices.map((office, index) => (
            <div key={index} className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">{office.address}</span>
              </div>
              
              {office.phones.map((phone, phoneIndex) => (
                <div key={phoneIndex} className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    {phone}
                  </a>
                </div>
              ))}
              
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  {office.emails.map((email, emailIndex) => (
                    <a key={emailIndex} href={`mailto:${email}`} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Open Distance and e-Learning Centre, University of Port Harcourt. All rights reserved.
          </p>
          <a
            href="https://www.m-rinternational.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            title="MR International"
          >
            <img
              src={mrLogo}
              alt="MR International"
              className="h-5 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
