import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [saving, setSaving] = useState(false);
  const [diplomaUrl, setDiplomaUrl] = useState("https://lms.odel.uniport.edu.ng/#/home");
  const [undergraduateUrl, setUndergraduateUrl] = useState("https://odeluniport.com/");

  useEffect(() => {
    if (isAdmin) {
      loadSettings();
    }
  }, [isAdmin]);

  const loadSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["lms_diploma_short_courses", "lms_undergraduate_postgraduate"]);

    data?.forEach((item) => {
      const value = typeof item.setting_value === "string" 
        ? item.setting_value 
        : JSON.stringify(item.setting_value).replace(/^"|"$/g, '');
      
      if (item.setting_key === "lms_diploma_short_courses") {
        setDiplomaUrl(value);
      } else if (item.setting_key === "lms_undergraduate_postgraduate") {
        setUndergraduateUrl(value);
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update or insert diploma URL
      await supabase
        .from("site_settings")
        .upsert({ 
          setting_key: "lms_diploma_short_courses", 
          setting_value: diplomaUrl 
        }, { onConflict: "setting_key" });

      // Update or insert undergraduate URL
      await supabase
        .from("site_settings")
        .upsert({ 
          setting_key: "lms_undergraduate_postgraduate", 
          setting_value: undergraduateUrl 
        }, { onConflict: "setting_key" });

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-muted-foreground">Configure site-wide settings and LMS portal links</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              LMS Portal URLs
            </CardTitle>
            <CardDescription>
              Configure the URLs for the Student Portal dropdown menu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="diploma-url">Diploma & Short Courses LMS URL</Label>
              <Input
                id="diploma-url"
                type="url"
                value={diplomaUrl}
                onChange={(e) => setDiplomaUrl(e.target.value)}
                placeholder="https://lms.odel.uniport.edu.ng/#/home"
              />
              <p className="text-xs text-muted-foreground">
                This link will be used for the "Diploma & Short Courses" portal option
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="undergraduate-url">Undergraduate & Postgraduate LMS URL</Label>
              <Input
                id="undergraduate-url"
                type="url"
                value={undergraduateUrl}
                onChange={(e) => setUndergraduateUrl(e.target.value)}
                placeholder="https://odeluniport.com/"
              />
              <p className="text-xs text-muted-foreground">
                This link will be used for the "Undergraduate & Postgraduate" portal option
              </p>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminSettings;
