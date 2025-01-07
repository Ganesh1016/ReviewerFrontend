import ReplySection from "@/components/ReplySection";
import ReviewList from "./ReviewList";
import { useState } from "react";

export type SingleReviewResponse = {
  _id: string;
  reviewId: string;
  name: string;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
    isAnonymous: boolean;
  };
  locationName: string;
  accountName: string;
  starRating: string;
  comment: string;
  createTime: string;
  reviewReply: {
    comment: string;
    updateTime: string | null;
  };
};

const ReplyToReviews = () => {
  const [selectedReview, setSelectedReview] =
    useState<SingleReviewResponse | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <div className="min-h-screen lg:w-full bg-white-500 font-poppins">
      {/* Mobile View Toggle - Only visible on mobile */}
      <div className="md:hidden sticky top-0 z-20 bg-white-500 border-b border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMobileView(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              !isMobileView
                ? "bg-blue-500 text-white-500"
                : "bg-white-500 text-black-500 border border-gray-200"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setIsMobileView(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isMobileView
                ? "bg-blue-500 text-white-500"
                : "bg-white-500 text-black-500 border border-gray-200"
            }`}
          >
            Reply
          </button>
        </div>
      </div>

      <main className="container mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-2rem)]">
          {/* ReviewList - Hidden on mobile when reply section is active */}
          <div
            className={`
            w-full lg:w-2/4
            ${isMobileView ? "hidden" : "block"} 
            lg:block
            transition-all duration-300 ease-in-out
          `}
          >
            <ReviewList setSelectedReview={setSelectedReview} />
          </div>

          {/* ReplySection - Hidden on mobile when review list is active */}
          <div
            className={`
            w-full lg:w-3/4
            ${!isMobileView ? "hidden" : "block"}
            lg:block
            transition-all duration-300 ease-in-out
          `}
          >
            <ReplySection
              selectedReview={selectedReview}
              onBack={() => setIsMobileView(false)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReplyToReviews;
