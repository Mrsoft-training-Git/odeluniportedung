import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Check if user has admin role using the has_role RPC function
      const { data: hasAdminRole, error } = await supabase
        .rpc("has_role", { _user_id: session.user.id, _role: "admin" });

      if (error) {
        console.error("Error checking admin role:", error);
        toast.error("Failed to verify admin access");
        navigate("/admin");
        return;
      }

      if (!hasAdminRole) {
        toast.error("Access denied. Admin privileges required.");
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminAuth();
  }, [navigate]);

  return { isAdmin, loading };
};
