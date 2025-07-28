import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { awardService } from "@/services/awardService";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { nominationService } from "@/services/nominationService";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultCategory: "Teacher of the Month" | "Teacher of the Year";
};

export default function NominationFormModal({ open, onClose, defaultCategory }: Props) {
  const [form, setForm] = useState({
    nominee_name: "",
    nominee_email: "",
    nominee_institution: "",
    category: defaultCategory,
    rationale: "",
    nominated_by_name: "",
    nominated_by_email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await nominationService.createNomination(form);
      toast.success("Nomination submitted successfully!");
      onClose();
      setForm({
        nominee_name: "",
        nominee_email: "",
        nominee_institution: "",
        category: defaultCategory,
        rationale: "",
        nominated_by_name: "",
        nominated_by_email: "",
      });
    } catch (err) {
      toast.error("Failed to submit nomination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Nominate a Teacher</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label>Nominee Name</Label>
            <Input name="nominee_name" value={form.nominee_name} onChange={handleChange} />
          </div>

          <div>
            <Label>Nominee Email (optional)</Label>
            <Input type="email" name="nominee_email" value={form.nominee_email} onChange={handleChange} />
          </div>

          <div>
            <Label>Nominee Institution</Label>
            <Input name="nominee_institution" value={form.nominee_institution} onChange={handleChange} />
          </div>

          <div>
            <Label>Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="Teacher of the Month">Teacher of the Month</option>
              <option value="Teacher of the Year">Teacher of the Year</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <Label>Why does this teacher deserve the award? (500 words)</Label>
            <Textarea name="rationale" value={form.rationale} onChange={handleChange} />
          </div>

          <div>
            <Label>Your Name</Label>
            <Input name="nominated_by_name" value={form.nominated_by_name} onChange={handleChange} />
          </div>

          <div>
            <Label>Your Email (optional)</Label>
            <Input name="nominated_by_email" value={form.nominated_by_email} onChange={handleChange} />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Nomination"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
