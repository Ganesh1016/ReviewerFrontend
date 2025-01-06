import ReplySection from "@/components/ReplySection";
import ReviewList from "./ReviewList";

const ReplyToReviews = () => {
  return (
    <div className="min-h-screen bg-[#a0a0a2] text-[#100b00] font-poppins">
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <ReviewList />
        <ReplySection />
      </main>
    </div>
  );
};

export default ReplyToReviews;
