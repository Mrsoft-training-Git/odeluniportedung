import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import dataScience from "@/assets/course-data-science.jpg";
import business from "@/assets/course-business.jpg";
import edtech from "@/assets/course-edtech.jpg";
import marketing from "@/assets/course-marketing.jpg";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const categories = [
    { value: "all", label: "All Programmes" },
    { value: "certificate_diploma", label: "Certificate/Diploma" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  const placeholderCourses = [
    {
      id: 1,
      title: "Data Science/Machine Learning",
      category: "certificate_diploma",
      duration: "6 months",
      lmsUrl: "https://lms.odel.uniport.edu.ng/course/data-science",
      image: dataScience,
      enrolled: 0,
      featured: true,
      description: "Master data analysis, machine learning algorithms, and AI implementation with hands-on projects and industry-standard tools.",
    },
    {
      id: 2,
      title: "Business Administration",
      category: "undergraduate",
      duration: "4 years",
      lmsUrl: "https://lms.odel.uniport.edu.ng/course/business-admin",
      image: business,
      enrolled: 45,
      featured: false,
      description: "Comprehensive undergraduate programme in business management and administration with practical case studies and real-world applications.",
    },
    {
      id: 3,
      title: "Educational Technology",
      category: "postgraduate",
      duration: "2 years",
      lmsUrl: "https://lms.odel.uniport.edu.ng/course/edtech",
      image: edtech,
      enrolled: 23,
      featured: false,
      description: "Master's programme focusing on the integration of technology in educational settings and modern teaching methodologies.",
    },
    {
      id: 4,
      title: "Digital Marketing Certificate",
      category: "certificate_diploma",
      duration: "3 months",
      lmsUrl: "https://lms.odel.uniport.edu.ng/course/digital-marketing",
      image: marketing,
      enrolled: 12,
      featured: false,
      description: "Learn digital marketing strategies, SEO, social media management, and analytics to excel in the digital landscape.",
    },
  ];

  const filteredCourses = activeCategory === "all" 
    ? placeholderCourses 
    : placeholderCourses.filter(course => course.category === activeCategory);

  const toggleFlip = (courseId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const downloadQRCode = (courseTitle: string) => {
    const svg = document.getElementById(`qr-${courseTitle}`)?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${courseTitle}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Our Programmes</h1>
              <p className="text-xl opacity-90">
                Explore our diverse range of courses designed to advance your career and personal growth
              </p>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 lg:grid-cols-4 mb-12">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((cat) => (
                <TabsContent key={cat.value} value={cat.value}>
                  {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredCourses.map((course) => (
                        <div key={course.id} className="perspective-1000">
                          <div
                            className={`relative w-full transition-transform duration-700 transform-style-3d ${
                              flippedCards.has(course.id) ? "[transform:rotateY(180deg)]" : ""
                            }`}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            {/* Front of Card */}
                            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card backface-hidden">
                              <div className="relative h-48 overflow-hidden bg-muted">
                                <img 
                                  src={course.image} 
                                  alt={course.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {course.featured && (
                                  <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full shadow-lg">
                                    <span className="text-sm font-semibold text-primary-foreground">Featured</span>
                                  </div>
                                )}
                              </div>

                              <CardContent className="p-6 space-y-4">
                                <div className="inline-block">
                                  <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                                    {categories.find(c => c.value === course.category)?.label || course.category}
                                  </span>
                                </div>

                                <h3 className="text-xl font-bold text-foreground line-clamp-2 min-h-[3.5rem]">
                                  {course.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3 min-h-[4rem]">
                                  {course.description}
                                </p>

                                <div className="flex items-center gap-2 text-muted-foreground pt-2">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="font-medium">{course.duration}</span>
                                  <span className="mx-2">•</span>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                  <span className="font-medium">{course.enrolled} enrolled</span>
                                </div>

                                <div className="flex gap-3 pt-4">
                                  <Button 
                                    className="flex-1 font-semibold"
                                    onClick={() => window.open(course.lmsUrl, '_blank')}
                                  >
                                    Enroll Now
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="flex-1 font-semibold"
                                    onClick={() => toggleFlip(course.id)}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Back of Card */}
                            <Card 
                              className="absolute inset-0 bg-card border-0 shadow-xl backface-hidden [transform:rotateY(180deg)]"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <CardContent className="p-6 h-full flex flex-col items-center justify-center space-y-6">
                                <h3 className="text-xl font-bold text-center text-foreground">
                                  {course.title}
                                </h3>
                                
                                <div 
                                  id={`qr-${course.title}`}
                                  className="bg-white p-4 rounded-lg shadow-inner"
                                >
                                  <QRCodeSVG 
                                    value={course.lmsUrl}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                  />
                                </div>

                                <p className="text-sm text-muted-foreground text-center">
                                  Scan to access course on LMS
                                </p>

                                <div className="flex flex-col gap-3 w-full">
                                  <Button 
                                    className="w-full font-semibold"
                                    onClick={() => window.open(course.lmsUrl, '_blank')}
                                  >
                                    Enroll Now
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="w-full font-semibold"
                                    onClick={() => downloadQRCode(course.title)}
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download QR Code
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    className="w-full font-semibold"
                                    onClick={() => toggleFlip(course.id)}
                                  >
                                    Back to Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No courses available in this category yet.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
