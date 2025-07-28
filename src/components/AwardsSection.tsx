
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Award as AwardIcon, Star } from "lucide-react";

// const AwardsSection = () => {
//   return (
//     <section id="awards" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
//           <p className="text-lg text-gray-600">Celebrating excellence in education</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
//             <CardHeader>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center">
//                   <AwardIcon className="h-6 w-6 text-yellow-foreground" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-yellow-800">Teacher of the Month</CardTitle>
//                   <CardDescription>Recognizing outstanding monthly achievements</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <div className="font-semibold">Sarah Johnson</div>
//                   <div className="text-sm text-gray-600">Mathematics Teacher, London</div>
//                 </div>
//               </div>
//               <Button className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground">Nominate a Teacher</Button>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
//             <CardHeader>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Star className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-purple-800">Teacher of the Year</CardTitle>
//                   <CardDescription>Annual recognition for exceptional educators</CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center mb-4">
//                 <div className="text-lg font-semibold">Nominations Open</div>
//                 <div className="text-sm text-gray-600">Submit your nomination by March 31st</div>
//               </div>
//               <Button className="w-full bg-purple-600 hover:bg-purple-700">Submit Nomination</Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AwardsSection;


// app/components/sections/AwardsSection.tsx

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award as AwardIcon, Star } from "lucide-react";
import NominationFormModal from "@/components/NominationFormModal";
import { awardService } from "@/services/awardService";
import { nominationService } from "@/services/nominationService";
export default function AwardsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<"Teacher of the Month" | "Teacher of the Year">("Teacher of the Month");
  const [currentWinner, setCurrentWinner] = useState<any | null>(null);
  const [currentWinnerYear, setCurrentWinnerYear] = useState<any | null>(null);

  useEffect(() => {
    nominationService.getApprovedTeacherOfTheMonth().then(setCurrentWinner);
    nominationService.getApprovedTeacherOfTheYear().then(setCurrentWinnerYear);
  }, []);

  const openModalFor = (cat: typeof category) => {
    setCategory(cat);
    setModalOpen(true);
  };

  return (
    <section id="awards" className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
          <p className="text-lg text-gray-600">Celebrating excellence in education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Teacher of the Month */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center">
                  <AwardIcon className="h-6 w-6 text-yellow-800" />
                </div>
                <div>
                  <CardTitle className="text-yellow-800">Teacher of the Month</CardTitle>
                  <CardDescription>Recognizing outstanding monthly achievements</CardDescription>
                </div>
              </div>
            </CardHeader>
              <CardContent>
                {currentWinner ? (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold">{currentWinner.nominee_name}</div>
                      <div className="text-sm text-gray-600">{currentWinner.nominee_institution}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 mb-4">No current winner</div>
                )}
                <Button
                  className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground"
                  onClick={() => openModalFor("Teacher of the Month")}
                >
                  Nominate a Teacher
                </Button>
              </CardContent>
          </Card>

          {/* Teacher of the Year */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-purple-800">Teacher of the Year</CardTitle>
                  <CardDescription>Annual recognition for exceptional educators</CardDescription>
                </div>
              </div>
            </CardHeader>
              <CardContent>
                {currentWinnerYear ? (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold">{currentWinnerYear.nominee_name}</div>
                      <div className="text-sm text-gray-600">{currentWinnerYear.nominee_institution}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 mb-4">No current winner</div>
                )}
              </CardContent>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-lg font-semibold">Nominations Open</div>
                <div className="text-sm text-gray-600">Submit your nomination by March 31st</div>
              </div>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => openModalFor("Teacher of the Year")}
              >
                Submit Nomination
              </Button>
            </CardContent>
          </Card>
        </div>

        <NominationFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultCategory={category}
        />
      </div>
    </section>
  );
}
