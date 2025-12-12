import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  image_url: string | null;
  lms_url: string | null;
  is_published: boolean;
}

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: "all", label: "All Programmes" },
    { value: "certificate_diploma", label: "Certificate/Diploma" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  const toggleFlip = (courseId: string) => {
    setFlippedCard(prev => prev === courseId ? null : courseId);
  };

  const downloadQRCode = (courseId: string, courseTitle: string) => {
    const svg = document.getElementById(`qr-${courseId}`)?.querySelector('svg');
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
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
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
                          <div key={course.id} className="perspective-1000 h-[380px]">
                            <div
                              className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                                flippedCard === course.id ? "[transform:rotateY(180deg)]" : ""
                              }`}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              {/* Front of Card */}
                              <Card className="absolute inset-0 group overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/50 bg-card backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                                <div className="relative h-40 overflow-hidden bg-muted">
                                  {course.image_url ? (
                                    <img 
                                      src={course.image_url} 
                                      alt={course.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                      No image
                                    </div>
                                  )}
                                  <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1.5 bg-primary/90 text-primary-foreground rounded-md text-sm font-medium">
                                      {categories.find(c => c.value === course.category)?.label || course.category}
                                    </span>
                                  </div>
                                </div>

                                <CardContent className="p-5 flex flex-col h-[calc(100%-10rem)]">
                                  <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-snug mb-2">
                                    {course.title}
                                  </h3>

                                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3 flex-grow">
                                    {course.description}
                                  </p>

                                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-sm">{course.duration}</span>
                                  </div>

                                  <div className="flex gap-3 mt-auto">
                                    <Button 
                                      className="flex-1"
                                      size="sm"
                                      onClick={() => course.lms_url && window.open(course.lms_url, '_blank')}
                                      disabled={!course.lms_url}
                                    >
                                      Enroll Now
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="flex-1"
                                      onClick={() => toggleFlip(course.id)}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Back of Card */}
                              <Card 
                                className="absolute inset-0 bg-card border border-border/50 shadow-xl backface-hidden [transform:rotateY(180deg)]"
                                style={{ backfaceVisibility: "hidden" }}
                              >
                                <CardContent className="p-5 h-full flex flex-col items-center justify-center space-y-3">
                                  <h3 className="text-base font-semibold text-center text-foreground line-clamp-2">
                                    {course.title}
                                  </h3>
                                  
                                  {course.lms_url ? (
                                    <>
                                      <div 
                                        id={`qr-${course.id}`}
                                        className="bg-white p-2 rounded-lg shadow-inner"
                                      >
                                        <QRCodeSVG 
                                          value={course.lms_url}
                                          size={120}
                                          level="H"
                                          includeMargin={true}
                                        />
                                      </div>

                                      <p className="text-xs text-muted-foreground text-center">
                                        Scan to access LMS
                                      </p>

                                      <div className="flex flex-col gap-2 w-full max-w-[200px]">
                                        <Button 
                                          className="w-full"
                                          size="sm"
                                          onClick={() => window.open(course.lms_url!, '_blank')}
                                        >
                                          Enroll Now
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="w-full"
                                          onClick={() => downloadQRCode(course.id, course.title)}
                                        >
                                          <Download className="w-4 h-4 mr-2" />
                                          Download QR
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="w-full"
                                          onClick={() => toggleFlip(course.id)}
                                        >
                                          ← Back
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-muted-foreground text-center text-sm">
                                        LMS link not available
                                      </p>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="w-full max-w-[200px]"
                                        onClick={() => toggleFlip(course.id)}
                                      >
                                        ← Back
                                      </Button>
                                    </>
                                  )}
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;