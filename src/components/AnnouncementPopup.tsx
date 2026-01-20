import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
}

const AnnouncementPopup = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchActiveAnnouncement = async () => {
      // Check if user has dismissed this session
      const dismissedId = sessionStorage.getItem('dismissed_announcement');
      
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, content, image_url, link_url, link_text')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data && data.id !== dismissedId) {
        setAnnouncement(data);
        // Small delay before showing popup for better UX
        setTimeout(() => setIsOpen(true), 1000);
      }
    };

    fetchActiveAnnouncement();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (announcement) {
      sessionStorage.setItem('dismissed_announcement', announcement.id);
    }
  };

  if (!announcement || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/90 hover:bg-background shadow-md transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Image */}
          {announcement.image_url && (
            <div className="w-full">
              <img
                src={announcement.image_url}
                alt={announcement.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Text Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {announcement.title}
            </h2>
            <div 
              className="prose prose-sm max-w-none text-muted-foreground mb-6"
              dangerouslySetInnerHTML={{ __html: announcement.content.replace(/\n/g, '<br/>') }}
            />
            
            {/* Action Button */}
            <div className="flex gap-3 justify-end">
              {announcement.link_url && (
                <Button asChild>
                  <a href={announcement.link_url} target="_blank" rel="noopener noreferrer">
                    {announcement.link_text || 'Learn More'}
                  </a>
                </Button>
              )}
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;
