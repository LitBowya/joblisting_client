import HeroSection from "@/app/(root)/components/HeroSection";
import RecommendedJobs from "@/app/(root)/components/RecommendedJobs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="max-width-lg mx-auto px-6 md:px-10 lg:px-20 mt-8">
        <RecommendedJobs />
      </div>
    </>
  );
}
