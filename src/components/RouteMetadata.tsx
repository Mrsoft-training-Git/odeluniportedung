import { Helmet } from "react-helmet-async";
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

  if (!metadata) {
    return (
      <Helmet>
        <title>Page Not Found — ODeL UniPort</title>
        <meta name="description" content="The requested ODeL UniPort page could not be found." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  const canonicalUrl = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
    </Helmet>
  );
};

export default RouteMetadata;