// // components/SignupFormModal.tsx
// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { toast } from "react-hot-toast";

// type Props = {
//   open: boolean;
//   onClose: () => void;
// };

// export default function SignupFormModal({ open, onClose }: Props) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       // Replace with actual signup logic (API call or service)
//       console.log("Submitting sign up:", form);
//       toast.success("Signed up successfully!");
//       onClose();
//       setForm({ name: "", email: "", message: "" });
//     } catch (error) {
//       toast.error("Signup failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Join the Community</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-4">
//           <div>
//             <Label>Name</Label>
//             <Input name="name" value={form.name} onChange={handleChange} />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input type="email" name="email" value={form.email} onChange={handleChange} />
//           </div>

//           <div>
//             <Label>Message (optional)</Label>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2"
//             />
//           </div>

//           <Button onClick={handleSubmit} disabled={loading} className="w-full">
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


// components/modals/JoinTeachEraModal.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api"; // axios instance

const JoinTeachEraModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post("/signup/", formData);
      toast.success("Account created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      });
      setSuccess(true);
    } catch (error: any) {
      const err =
        error?.response?.data?.email?.[0] ||
        error?.response?.data?.username?.[0] ||
        error?.response?.data?.password?.[0] ||
        error?.response?.data?.detail ||
        "Something went wrong. Try again.";
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40" />
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full z-50 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-lg font-bold mb-4">
            Join TeachEra
          </Dialog.Title>

          {success ? (
            <div className="text-green-600">Thank you for signing up!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="text-gray-500">Enter a valid email address</small>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
                <small className="text-gray-500">At least 8 characters</small>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default JoinTeachEraModal;
