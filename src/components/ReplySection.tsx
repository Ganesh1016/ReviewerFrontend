import { useState } from "react";
import { Star, Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SingleReviewResponse } from "@/pages/Dashboard/ReplyToReviews";
import axios from "axios";

const ReplySection = ({
  selectedReview,
  isReviewLoading,
}: {
  selectedReview: SingleReviewResponse | null;
  isReviewLoading: boolean;
  onBack?: () => void;
}) => {
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const existingReply = selectedReview?.reviewReply?.comment;
  const replyTimestamp = selectedReview?.reviewReply?.updateTime;

  const handleSave = async () => {
    if (!selectedReview) {
      toast.error("No review selected!");
      return;
    }

    if (!reply.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = `http://127.0.0.1:7000/api/reviews/${encodeURIComponent(
        selectedReview.name
      )}/reply`;

      console.log(
        `http://127.0.0.1:7000/api/reviews/${encodeURIComponent(
          selectedReview.name
        )}/reply`
      );

      await axios.put(apiUrl, { comment: reply });

      toast.success("Reply saved successfully!");
      setReply("");
    } catch (error) {
      console.error("Error saving reply:", error);
      toast.error("Failed to save reply. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isReviewLoading) {
    return (
      <div className="w-full lg:w-full bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
        <Loader className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (!selectedReview) {
    return (
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Reply to Review</h2>
        <p className="text-sm text-gray-500">Select a review to reply to.</p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reply to Review</h2>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">
            {selectedReview.reviewer.displayName}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <
                  (selectedReview.starRating === "FIVE"
                    ? 5
                    : selectedReview.starRating === "FOUR"
                    ? 4
                    : selectedReview.starRating === "THREE"
                    ? 3
                    : selectedReview.starRating === "TWO"
                    ? 2
                    : 1)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {new Date(selectedReview.createTime).toLocaleDateString()}
        </p>
        <p className="text-sm">{selectedReview.comment}</p>
      </div>
      {existingReply ? (
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800">Your Reply:</h3>
          <p className="text-sm text-gray-700 mt-2">{existingReply}</p>
          {replyTimestamp && (
            <p className="text-xs text-gray-500 mt-2">
              Replied on: {new Date(replyTimestamp).toLocaleString()}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="reply"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Reply
            </label>
            <textarea
              id="reply"
              rows={4}
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-[#4562d9]"
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setReply("")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#4562d9] rounded-lg hover:bg-[#3a53b8] focus:outline-none focus:ring-2 focus:ring-[#4562d9] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Save Reply"
              )}
            </button>
          </div>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ReplySection;
