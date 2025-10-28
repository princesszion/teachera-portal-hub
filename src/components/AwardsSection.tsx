

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award as AwardIcon, Star, X } from "lucide-react";
import NominationFormModal from "@/components/NominationFormModal";
import { nominationService } from "@/services/nominationService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AwardsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<
    "Teacher of the Month" | "Teacher of the Year"
  >("Teacher of the Month");
  const [currentWinner, setCurrentWinner] = useState<any | null>(null);
  const [currentWinnerYear, setCurrentWinnerYear] = useState<any | null>(null);

  const [showRationale, setShowRationale] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const month = await nominationService.getApprovedTeacherOfTheMonth();
        const year = await nominationService.getApprovedTeacherOfTheYear();
        setCurrentWinner(month);
        setCurrentWinnerYear(year);
      } catch (error) {
        console.error("Error fetching nominations:", error);
      }
    }
    fetchData();
  }, []);

  const openModalFor = (cat: typeof category) => {
    setCategory(cat);
    setModalOpen(true);
  };

  const openRationaleModal = (winner: any) => {
    setSelectedWinner(winner);
    setShowRationale(true);
  };

  const modalColor =
    selectedWinner?.category === "Teacher of the Year"
      ? "text-purple-700"
      : "text-yellow-700";

  return (
    <section id="awards" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
  <h3 className="text-3xl font-bold text-gray-900 mb-4">
    Awards & Recognition
  </h3>
  <p className="text-lg text-gray-600 mb-6">
    Celebrating excellence in education
  </p>

  <Button
    size="lg"
    className="relative px-8 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out"
    style={{
      backgroundColor: "#140ca6",
      borderColor: "#140ca6",
      boxShadow: "0 0 15px rgba(20, 12, 166, 0.3)",
    }}
    onClick={() => openModalFor("Teacher of the Month")}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#0f098a";
      e.currentTarget.style.boxShadow = "0 0 25px rgba(20, 12, 166, 0.6)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "#140ca6";
      e.currentTarget.style.boxShadow = "0 0 15px rgba(20, 12, 166, 0.3)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    Nominate a Teacher
  </Button>
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 🏆 Teacher of the Month */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 flex flex-col justify-between">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center mb-2">
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-2">
                  <AwardIcon className="h-6 w-6 text-yellow-800" />
                </div>
                <CardTitle className="text-yellow-800 text-xl">
                  Teacher of the Month
                </CardTitle>
                <CardDescription className="text-gray-700 text-sm">
                  Recognizing outstanding monthly achievements
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="text-center space-y-3 flex flex-col items-center">
              {currentWinner ? (
                <>
                  {currentWinner.photo && (
                    <img
                      src={currentWinner.photo}
                      alt={currentWinner.nominee_name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-yellow-200 shadow-md"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">
                      {currentWinner.nominee_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentWinner.nominee_institution}
                    </p>
                  </div>

                  {currentWinner.rationale && (
                    <Button
                      variant="link"
                      className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground mt-2"
                      onClick={() => openRationaleModal(currentWinner)}
                    >
                      Read more about {currentWinner.nominee_name}</Button>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">No current winner</p>
              )}
            </CardContent>
          </Card>

          {/* 🌟 Teacher of the Year */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 flex flex-col justify-between">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center mb-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800 text-xl">
                  Teacher of the Year
                </CardTitle>
                <CardDescription className="text-gray-700 text-sm">
                  Annual recognition for exceptional educators
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="text-center space-y-3 flex flex-col items-center">
              {currentWinnerYear ? (
                <>
                  {currentWinnerYear.photo && (
                    <img
                      src={currentWinnerYear.photo}
                      alt={currentWinnerYear.nominee_name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-purple-200 shadow-md"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">
                      {currentWinnerYear.nominee_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentWinnerYear.nominee_institution}
                    </p>
                  </div>

                  {currentWinnerYear.rationale && (
                    <Button
                      variant="link"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-2"
                      onClick={() => openRationaleModal(currentWinnerYear)}
                    > Read More about {currentWinnerYear.nominee_name} </Button>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500">No current winner</p>
              )}
            </CardContent>
          </Card>
        </div>
      {/* 🎖️ Rationale Modal */}
<Dialog open={showRationale} onOpenChange={setShowRationale}>
  <DialogContent
    className={`max-w-2xl w-full overflow-hidden p-0 rounded-2xl shadow-xl border-0 ${
      selectedWinner?.category === "Teacher of the Year"
        ? "bg-purple-50"
        : "bg-yellow-50"
    } animate-fadeIn`}
  >
    {/* Image header */}
    {selectedWinner?.photo && (
      <div className="relative w-full h-64 sm:h-80 overflow-hidden animate-slideIn">
        <img
          src={selectedWinner.photo}
          alt={selectedWinner.nominee_name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
        <button
          onClick={() => setShowRationale(false)}
          className="absolute top-4 right-4 bg-white/70 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )}

    {/* Content */}
    <div className="p-6 text-center animate-fadeUp">
      <div className="flex flex-col items-center mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            selectedWinner?.category === "Teacher of the Year"
              ? "bg-purple-100"
              : "bg-yellow-100"
          }`}
        >
          <AwardIcon
            className={`h-7 w-7 ${
              selectedWinner?.category === "Teacher of the Year"
                ? "text-purple-700"
                : "text-yellow-700"
            }`}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">
          {selectedWinner?.nominee_name}
        </h2>
        <p className="text-sm text-gray-600">
          {selectedWinner?.nominee_institution}
        </p>
      </div>

      <div
        className={`mt-3 text-sm leading-relaxed whitespace-pre-line text-justify ${
          selectedWinner?.category === "Teacher of the Year"
            ? "text-purple-800"
            : "text-yellow-800"
        }`}
      >
        {selectedWinner?.rationale}
      </div>
    </div>
  </DialogContent>
</Dialog>



        <NominationFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultCategory={category}
        />
      </div>
    </section>
  );
}
