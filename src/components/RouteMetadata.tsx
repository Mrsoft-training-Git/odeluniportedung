import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://odeluniportedung.lovable.app";

const publicMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "ODeL UniPort — Excellence in E-Learning",
    description:
      "Explore flexible, quality open, distance and e-learning programmes from the University of Port Harcourt.",
  },
  "/about": {
    title: "About ODeL UniPort — Vision, Mission & Team",
    description:
      "Learn about ODeL UniPort's vision, mission, educational values and management team advancing accessible learning in Nigeria.",
  },
  "/courses": {
    title: "Courses & Programmes — ODeL UniPort",
    description:
      "Browse ODeL UniPort certificate, diploma, undergraduate and postgraduate programmes designed for flexible learning.",
  },
  "/gallery": {
    title: "Gallery — ODeL UniPort",
    description:
      "View moments from ODeL UniPort learning activities, events and the University of Port Harcourt community.",
  },
  "/contact": {
    title: "Contact ODeL UniPort — Programme Enquiries",
    description:
      "Contact ODeL UniPort for help with programmes, admissions and open, distance or e-learning enquiries.",
  },
};

const RouteMetadata = () => {
  const { pathname } = useLocation();
  const metadata = publicMetadata[pathname];

  useEffect(() => {
    const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const existingRobots = document.head.querySelector('meta[name="robots"]');
    const existingCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!metadata) {
      document.title = "Page Not Found — ODeL UniPort";
      setMeta('meta[name="description"]', "name", "description", "The requested ODeL UniPort page could not be found.");
      setMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
      existingCanonical?.remove();
      return;
    }

    existingRobots?.remove();
    const canonicalUrl = `${SITE_URL}${pathname}`;
    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);

    const canonical = existingCanonical ?? document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = canonicalUrl;
    if (!existingCanonical) document.head.appendChild(canonical);
  }, [metadata, pathname]);

  return null;
};

export default RouteMetadata;