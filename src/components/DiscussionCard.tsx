// components/DiscussionCard.tsx
import { useState } from "react";
import CommentItem from "./CommentItem";
import { apiClient } from "@/lib/api";
import { toast } from "sonner";

export default function DiscussionCard({ comments = [], refreshComments }: any) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const postComment = async (text: string, parentId: number | null = null, commenterName?: string) => {
    try {
      await apiClient.post("/feedback/comments/", {
        body: text,
        parent: parentId,
        name: commenterName || name || "",
      });
      toast.success("Comment posted!");
      refreshComments();
    } catch (error) {
      toast.error("Could not post reply.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      await postComment(content, null, name.trim());
      setContent("");
      setName("");
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold text-gray-800 mb-4">Discussion Forum</h4>
      <div className="text-md  text-gray-500 mb-4">Join the Discussion,share your thoughts</div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something with the community..."
          className="w-full p-3 border rounded-md shadow-sm"
          rows={3}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment: any) => (
          <CommentItem key={comment.id} comment={comment} onReply={postComment} />
        ))}
      </div>
    </div>
  );
}
