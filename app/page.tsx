import FacialAnalysis from "@/components/FacialAnalysis";
import Faq from "@/components/Faq";
import PersonalisedPlan from "@/components/PersonalisedPlan";
export default function Home() {
  return (
    <main>
      <PersonalisedPlan />
      <FacialAnalysis/>
      <Faq />
    </main>
  );
}
