import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery_media")
        .select("id, title, description, url, category")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setImages(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

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
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No images available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-muted"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold truncate">{image.title}</h3>
                        {image.category && (
                          <span className="text-white/80 text-sm capitalize">{image.category}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-muted-foreground mt-2">{selectedImage.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
