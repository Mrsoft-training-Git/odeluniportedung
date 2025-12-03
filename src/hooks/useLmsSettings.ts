import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LmsSettings {
  diplomaShortCourses: string;
  undergraduatePostgraduate: string;
}

export const useLmsSettings = () => {
  return useQuery({
    queryKey: ["lms-settings"],
    queryFn: async (): Promise<LmsSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value")
        .in("setting_key", ["lms_diploma_short_courses", "lms_undergraduate_postgraduate"]);

      if (error) throw error;

      const settings: LmsSettings = {
        diplomaShortCourses: "https://lms.odel.uniport.edu.ng/#/home",
        undergraduatePostgraduate: "https://odeluniport.com/",
      };

      data?.forEach((item) => {
        const value = typeof item.setting_value === "string" 
          ? item.setting_value 
          : JSON.stringify(item.setting_value).replace(/^"|"$/g, '');
        
        if (item.setting_key === "lms_diploma_short_courses") {
          settings.diplomaShortCourses = value;
        } else if (item.setting_key === "lms_undergraduate_postgraduate") {
          settings.undergraduatePostgraduate = value;
        }
      });

      return settings;
    },
  });
};
