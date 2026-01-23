import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthWebhookPayload {
  type: string;
  table: string;
  record: {
    id: string;
    email: string;
    raw_user_meta_data?: {
      full_name?: string;
      name?: string;
    };
    created_at: string;
  };
  schema: string;
  old_record: null | Record<string, unknown>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Use service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: AuthWebhookPayload = await req.json();
    console.log("Received webhook payload:", JSON.stringify(payload, null, 2));

    // Only process INSERT events on auth.users
    if (payload.type !== "INSERT" || payload.table !== "users") {
      return new Response(
        JSON.stringify({ message: "Ignored: not a new user event" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const user = payload.record;
    const fullName = user.raw_user_meta_data?.full_name || 
                     user.raw_user_meta_data?.name || 
                     user.email?.split("@")[0] || 
                     "User";

    console.log(`Creating profile for user: ${user.id}, email: ${user.email}`);

    // Create profile entry
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      // Don't fail completely - profile might already exist
      if (profileError.code !== "23505") { // Not a duplicate key error
        throw profileError;
      }
    } else {
      console.log("Profile created successfully");
    }

    // Create default user role (assign 'user' role by default)
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({
        user_id: user.id,
        role: "user",
      });

    if (roleError) {
      console.error("Error creating user role:", roleError);
      // Don't fail completely - role might already exist
      if (roleError.code !== "23505") { // Not a duplicate key error
        throw roleError;
      }
    } else {
      console.log("User role created successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "User profile and role created successfully",
        user_id: user.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error: unknown) {
    console.error("Error processing webhook:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
