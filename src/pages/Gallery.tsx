import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
              <p className="text-xl opacity-90">
                Explore moments from campus life, events, and learning activities
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gallery content will be managed through the admin dashboard</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
