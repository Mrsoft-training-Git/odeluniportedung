import { MapPin, Phone, Mail } from "lucide-react";

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
      <div className="container py-12">
        <h2 className="text-2xl font-bold text-center mb-10">Contact us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offices.map((office, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{office.address}</span>
              </div>
              
              {office.phones.map((phone, phoneIndex) => (
                <div key={phoneIndex} className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {phone}
                  </a>
                </div>
              ))}
              
              <div className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  {office.emails.map((email, emailIndex) => (
                    <a key={emailIndex} href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Open Distance and e-Learning Centre, University of Port Harcourt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
