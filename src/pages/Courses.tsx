import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");

  const categories = [
    { value: "all", label: "All Programmes" },
    { value: "short_course", label: "Short Courses" },
    { value: "diploma", label: "Diploma" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  // Placeholder courses
  const placeholderCourses = [
    {
      id: 1,
      title: "Introduction to Digital Marketing",
      category: "short_course",
      duration: "3 months",
      description: "Learn the fundamentals of digital marketing including SEO, social media marketing, and content strategy.",
    },
    {
      id: 2,
      title: "Business Administration",
      category: "undergraduate",
      duration: "4 years",
      description: "Comprehensive undergraduate programme in business management and administration.",
    },
    {
      id: 3,
      title: "Educational Technology",
      category: "postgraduate",
      duration: "2 years",
      description: "Master's programme focusing on the integration of technology in educational settings.",
    },
  ];

  const filteredCourses = activeCategory === "all" 
    ? placeholderCourses 
    : placeholderCourses.filter(course => course.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
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
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 lg:grid-cols-5 mb-12">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((cat) => (
                <TabsContent key={cat.value} value={cat.value}>
                  {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map((course) => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">Duration: {course.duration}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                            <Button className="w-full">View Details</Button>
                          </CardContent>
                        </Card>
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
