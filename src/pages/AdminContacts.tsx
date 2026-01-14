import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, MailOpen, Trash2, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import uniportLogo from "@/assets/uniport-logo-crest.png";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminContacts = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchContacts();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel("contacts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        () => fetchContacts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ is_read: !isRead })
        .eq("id", id);

      if (error) throw error;
      toast.success(isRead ? "Marked as unread" : "Marked as read");
      
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, is_read: !isRead });
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Message deleted");
      
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete message");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={uniportLogo}
              alt="UNIPORT Logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold">ODeL Admin</h1>
              <p className="text-xs text-muted-foreground">
                Content Management System
              </p>
            </div>
          </Link>
          <Button onClick={handleLogout} variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Messages</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "No unread messages"}
            </p>
          </div>
          <Button variant="outline" onClick={fetchContacts} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3">
            {loading ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Loading messages...
                </CardContent>
              </Card>
            ) : contacts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No contact messages yet
                </CardContent>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedContact?.id === contact.id
                      ? "ring-2 ring-primary"
                      : ""
                  } ${!contact.is_read ? "border-primary/50 bg-primary/5" : ""}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {!contact.is_read && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                          <span className={`font-medium truncate ${!contact.is_read ? "text-foreground" : "text-muted-foreground"}`}>
                            {contact.name}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${!contact.is_read ? "font-medium" : ""}`}>
                          {contact.subject}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(contact.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedContact.subject}</CardTitle>
                      <CardDescription className="mt-2">
                        From: <span className="font-medium">{selectedContact.name}</span> ({selectedContact.email})
                      </CardDescription>
                      <CardDescription>
                        Received: {format(new Date(selectedContact.created_at), "MMMM d, yyyy 'at' h:mm a")}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(selectedContact.id, selectedContact.is_read)}
                      >
                        {selectedContact.is_read ? (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            Mark Unread
                          </>
                        ) : (
                          <>
                            <MailOpen className="h-4 w-4 mr-2" />
                            Mark Read
                          </>
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this message from {selectedContact.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(selectedContact.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`, "_blank")}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16 text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message to view its contents</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminContacts;