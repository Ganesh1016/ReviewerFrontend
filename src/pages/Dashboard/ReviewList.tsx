import { useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 4,
    date: "2023-05-01",
    text: "Great product, highly recommended!",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 2,
    date: "2023-04-28",
    text: "Disappointed with the quality.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    date: "2023-04-25",
    text: "Excellent service and fast delivery.",
  },
  // Add more review objects here
];

const ReviewList = () => {
  const [filter, setFilter] = useState("all");

  const filteredReviews = reviews.filter((review) => {
    if (filter === "positive") return review.rating >= 4;
    if (filter === "negative") return review.rating <= 2;
    return true;
  });

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "all"
              ? "bg-[#4562d9] text-white"
              : "bg-gray-200 text-[#100b00]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("positive")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "positive"
              ? "bg-[#4562d9] text-white"
              : "bg-gray-200 text-[#100b00]"
          }`}
        >
          Positive
        </button>
        <button
          onClick={() => setFilter("negative")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "negative"
              ? "bg-[#4562d9] text-white"
              : "bg-gray-200 text-[#100b00]"
          }`}
        >
          Negative
        </button>
      </div>
      <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{review.name}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{review.date}</p>
            <p className="text-sm line-clamp-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
