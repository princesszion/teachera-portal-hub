import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";

export default function FeedbackCard() {
  const [feedback, setFeedback] = useState({ name: "", email: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.content.trim()) return;
    setLoading(true);
    try {
      await apiClient.post("/feedback/feedbacks/", feedback);
      toast.success("Feedback submitted!");
      setFeedback({ name: "", email: "", content: "" });
    } catch {
      toast.error("Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Leave Feedback
        </CardTitle>
        <CardDescription>Help us improve TeachEra with your suggestions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input
          placeholder="Your name (optional)"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Your email (optional)"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
        />
        <Textarea
          placeholder="Share your feedback..."
          value={feedback.content}
          onChange={(e) => setFeedback({ ...feedback, content: e.target.value })}
        />
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading || !feedback.content.trim()}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </CardContent>
    </Card>
  );
}
