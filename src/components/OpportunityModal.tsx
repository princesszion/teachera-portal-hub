import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Share2 } from "lucide-react";
import { Opportunity } from "@/types/api";
import { Popover } from "@headlessui/react";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";

interface OpportunityModalProps {
  open: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
}

const OpportunityModal = ({ open, onClose, opportunity }: OpportunityModalProps) => {
  if (!opportunity) return null;

  const shareUrl = `${window.location.origin}/?opportunity=${opportunity.id}`;

  // ✅ Scroll lock when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // ✅ Copy link to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // ✅ prevent close on inner clicks
            >
              {/* ✅ Top-right close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {opportunity.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Organization:</strong> {opportunity.organization}
              </p>
              {opportunity.deadline && (
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Deadline:</strong>{" "}
                  {new Date(opportunity.deadline).toLocaleDateString()}
                </p>
              )}

              {/* Description */}
              {opportunity.description && (
                <div
                  className="prose prose-sm max-w-none mb-4"
                  dangerouslySetInnerHTML={{ __html: opportunity.description }}
                />
              )}

              {/* Eligibility */}
              {opportunity.eligibility && (
                <div
                  className="prose prose-sm max-w-none mb-4"
                  dangerouslySetInnerHTML={{ __html: opportunity.eligibility }}
                />
              )}

              {/* Benefits */}
              {opportunity.benefits && (
                <div
                  className="prose prose-sm max-w-none mb-4"
                  dangerouslySetInnerHTML={{ __html: opportunity.benefits }}
                />
              )}

              {/* Process */}
              {opportunity.process && (
                <div
                  className="prose prose-sm max-w-none mb-4"
                  dangerouslySetInnerHTML={{ __html: opportunity.process }}
                />
              )}

              {/* Footer Buttons */}
              <div className="flex flex-wrap items-center justify-between mt-6 gap-3 border-t border-gray-200 pt-4">
                {/* Share button */}
                <Popover className="relative">
                  <Popover.Button className="flex items-center gap-2 border border-[#140ca6] text-[#140ca6] px-3 py-2 rounded-md hover:bg-[#140ca6]/10 transition">
                    <Share2 className="h-4 w-4" /> Share
                  </Popover.Button>

                  <Popover.Panel className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg p-3 flex gap-2 z-50">
                    <TwitterShareButton url={shareUrl} title={opportunity.title}>
                      <XIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton url={shareUrl} title={opportunity.title}>
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    {/* Copy link button */}
                    <button
                      onClick={handleCopy}
                      className="border border-gray-300 rounded-full p-1 hover:bg-gray-100"
                    >
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </Popover.Panel>
                </Popover>

                {/* Close + Apply Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4 mr-1" /> Close
                  </Button>

                  {opportunity.process?.includes("http") && (
                    <Button
                      className="bg-[#140ca6] hover:bg-[#0f0992] text-white"
                      onClick={() =>
                        window.open(
                          opportunity.process.match(/https?:\/\/[^\s"]+/)?.[0] || "#",
                          "_blank"
                        )
                      }
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OpportunityModal;
