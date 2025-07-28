// components/CommentItem.tsx
import { useState } from "react";

interface CommentItemProps {
  comment: any;
  onReply: (content: string, parentId: number, name?: string) => void;
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(replyContent, comment.id, replyName.trim());
      setReplyContent("");
      setReplyName("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="border rounded-xl shadow-sm p-4 mb-4 bg-gray-50">
      <p className="text-gray-800 font-medium">{comment.name || "Anonymous"}</p>
      <p className="text-gray-600 mt-1">{comment.body}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(comment.created_at).toLocaleString()}
      </p>

      <div className="flex items-center gap-4 mt-3 text-sm text-blue-600">
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          {showReplyForm ? "Cancel" : "Reply"}
        </button>
        {comment.replies?.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? "Hide Replies" : `Show Replies (${comment.replies.length})`}
          </button>
        )}
      </div>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-3 space-y-2">
          <input
            type="text"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full p-2 border rounded-md"
          />
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-2 border rounded-md"
            rows={2}
          />
          <button
            type="submit"
            className="mt-1 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Post Reply
          </button>
        </form>
      )}

      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-6 mt-4 space-y-4">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}
