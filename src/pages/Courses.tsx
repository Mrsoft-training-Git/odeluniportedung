import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dataScience from "@/assets/course-data-science.jpg";
import business from "@/assets/course-business.jpg";
import edtech from "@/assets/course-edtech.jpg";
import marketing from "@/assets/course-marketing.jpg";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");

  const categories = [
    { value: "all", label: "All Programmes" },
    { value: "certificate_diploma", label: "Certificate/Diploma" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
  ];

  // Placeholder courses
  const placeholderCourses = [
    {
      id: 1,
      title: "Data Science/Machine Learning",
      category: "certificate_diploma",
      duration: "6 months",
      price: "₦150,000",
      image: dataScience,
      enrolled: 0,
      featured: true,
      description: "Master data analysis, machine learning algorithms, and AI implementation.",
    },
    {
      id: 2,
      title: "Business Administration",
      category: "undergraduate",
      duration: "4 years",
      price: "Contact for pricing",
      image: business,
      enrolled: 45,
      featured: false,
      description: "Comprehensive undergraduate programme in business management and administration.",
    },
    {
      id: 3,
      title: "Educational Technology",
      category: "postgraduate",
      duration: "2 years",
      price: "Contact for pricing",
      image: edtech,
      enrolled: 23,
      featured: false,
      description: "Master's programme focusing on the integration of technology in educational settings.",
    },
    {
      id: 4,
      title: "Digital Marketing Certificate",
      category: "certificate_diploma",
      duration: "3 months",
      price: "₦80,000",
      image: marketing,
      enrolled: 12,
      featured: false,
      description: "Learn digital marketing strategies, SEO, and social media management.",
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
                        <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card">
                          {/* Course Image */}
                          <div className="relative h-48 overflow-hidden bg-muted">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {course.featured && (
                              <div className="absolute top-4 right-4 bg-background px-4 py-2 rounded-full shadow-lg">
                                <span className="text-sm font-semibold text-foreground">Featured</span>
                              </div>
                            )}
                          </div>

                          <CardContent className="p-6 space-y-4">
                            {/* Category Badge */}
                            <div className="inline-block">
                              <span className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium">
                                {categories.find(c => c.value === course.category)?.label || course.category}
                              </span>
                            </div>

                            {/* Course Title */}
                            <h3 className="text-xl font-bold text-foreground line-clamp-2 min-h-[3.5rem]">
                              {course.title}
                            </h3>

                            {/* Price and Enrollment */}
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-2xl font-bold text-primary">{course.price}</span>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="font-medium">{course.enrolled}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                              <Button className="flex-1 font-semibold">
                                Enroll Now
                              </Button>
                              <Button variant="outline" className="flex-1 font-semibold">
                                View Details
                              </Button>
                            </div>
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
