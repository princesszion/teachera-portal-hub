
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { MessageSquare, Users } from "lucide-react";

// const CommunitySection = () => {
//   return (
//     <section id="community" className="py-16 bg-white">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">Community Discussion</h3>
//           <p className="text-lg text-gray-600">Connect, share, and learn from fellow educators</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <MessageSquare className="h-5 w-5" />
//                 Leave Feedback
//               </CardTitle>
//               <CardDescription>Help us improve TeachEra with your suggestions</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Textarea placeholder="Share your feedback or suggestions..." />
//               <Button className="w-full">Submit Feedback</Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Discussion Forum
//               </CardTitle>
//               <CardDescription>Join conversations with other educators</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 mb-4">
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <div className="font-semibold text-sm">Latest: Best practices for remote teaching</div>
//                   <div className="text-xs text-gray-600">42 replies • 2 hours ago</div>
//                 </div>
//                 <div className="p-3 bg-gray-50 rounded-lg">
//                   <div className="font-semibold text-sm">How to integrate technology in classrooms?</div>
//                   <div className="text-xs text-gray-600">18 replies • 5 hours ago</div>
//                 </div>
//               </div>
//               <Button variant="outline" className="w-full">Join Discussion</Button>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="bg-blue-50 border-blue-200">
//           <CardHeader className="text-center">
//             <CardTitle className="text-blue-800">Write Us a Prompt</CardTitle>
//             <CardDescription>Have a specific question or need guidance? Ask our community!</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Input placeholder="Subject of your prompt..." />
//             <Textarea placeholder="Describe your question or challenge in detail..." />
//             <Button className="w-full bg-blue-600 hover:bg-blue-700">Post Prompt</Button>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// };

// export default CommunitySection;

// import FeedbackCard from "@/components/FeedbackCard";
// import DiscussionCard from "@/components/DiscussionCard";

// const CommunitySection = () => {
//   return (
//     <section id="community" className="py-16 bg-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">Community Discussion</h3>
//           <p className="text-lg text-gray-600">Connect, share, and learn from fellow educators</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <FeedbackCard />
//           <DiscussionCard />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommunitySection;

import { useEffect, useState } from "react";
import { toast } from "sonner";
import FeedbackCard from "@/components/FeedbackCard";
import DiscussionCard from "@/components/DiscussionCard";
import { apiClient } from "@/lib/api";

export default function CommunitySection() {
  const [comments, setComments] = useState<any[]>([]); // You can use a specific type if you want
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/feedback/comments/?ordering=created_at");
      setComments((res as any).results || []);
    } catch (error) {
      toast.error("Could not load discussion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section id="community" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Community Space</h3>
          <p className="text-lg text-gray-600">Connect, share, and shape TeachEra together.</p>
        </div>

        <FeedbackCard />

        <DiscussionCard comments={comments} refreshComments={fetchComments} />
      </div>
    </section>
  );
}
