import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

// Types
type Location = {
  _id: string;
  locationName: string;
  address: string;
  phone: string;
  accountName: string;
  state: {
    status: string;
    verified: boolean;
    creationDate: string;
  };
};

type Review = {
  _id: string;
  reviewId: string;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
    isAnonymous: boolean;
  };
  locationName: string;
  accountName: string;
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment: string;
  createTime: string;
};

type SingleReviewResponse = {
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

type Filter = "all" | "positive" | "negative";

const ReviewList = ({
  setSelectedReview,
}: {
  setSelectedReview: (review: SingleReviewResponse | null) => void;
}) => {
  const [filter, setFilter] = useState<Filter>("all");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await axios.get<{ locations: Location[] }>(
          "http://127.0.0.1:7000/api/accounts/Shazam%20Tech/locations"
        );
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
      }
    }
    return "just now";
  };

  // Fetch reviews based on selected location
  useEffect(() => {
    if (!selectedLocation) return;

    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      try {
        const selectedLocationName = locations.find(
          (loc) => loc._id === selectedLocation
        )?.locationName;

        if (!selectedLocationName) return;

        const response = await axios.get<{ reviews: Review[] }>(
          `http://127.0.0.1:7000/api/accounts/Shazam%20Tech/locations/${encodeURIComponent(
            selectedLocationName
          )}/reviews`
        );

        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [selectedLocation, locations]);

  // Handle review click to fetch single review details
  const handleReviewClick = async (reviewName: string) => {
    try {
      const response = await axios.get<SingleReviewResponse>(
        `http://127.0.0.1:7000/api/reviews?review_name=${encodeURIComponent(
          reviewName
        )}`
      );
      setSelectedReview(response.data);
    } catch (error) {
      console.error("Error fetching single review details:", error);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    if (filter === "positive") return review.starRating === "FIVE";
    if (filter === "negative") return review.starRating === "ONE";
    return true;
  });

  return (
    <Card className=" lg:w-full bg-white-500 rounded-xl shadow-lg h-full">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-black-500">
              Recent Reviews
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Latest customer feedback
            </p>
          </div>
          <Select
            onValueChange={(value) => setSelectedLocation(value)}
            value={selectedLocation}
          >
            <SelectTrigger className="w-full sm:w-[120px] bg-white-500">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {isLoadingLocations ? (
                  <div className="px-4 py-2 text-sm">Loading locations...</div>
                ) : (
                  locations.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.locationName}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-blue-500 text-white-500 shadow-sm"
                : "bg-white-500 text-black-500 border border-gray-200 hover:bg-blue-50"
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter("positive")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "positive"
                ? "bg-blue-500 text-white-500 shadow-sm"
                : "bg-white-500 text-black-500 border border-gray-200 hover:bg-blue-50"
            }`}
          >
            Positive
          </button>
          <button
            onClick={() => setFilter("negative")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "negative"
                ? "bg-blue-500 text-white-500 shadow-sm"
                : "bg-white-500 text-black-500 border border-gray-200 hover:bg-blue-50"
            }`}
          >
            Negative
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="p-6">
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
          {isLoadingReviews ? (
            <div className="flex justify-center items-center h-32">
              <Loader className="animate-spin w-6 h-6 text-blue-500" />
            </div>
          ) : selectedLocation ? (
            filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div
                  key={review._id}
                  onClick={() => handleReviewClick(review.name)}
                  className="p-4 rounded-xl border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all cursor-pointer bg-white-500 group"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 bg-blue-100 text-blue-500 ring-2 ring-white-500">
                      <span className="text-sm font-medium">
                        {getInitials(review.reviewer.displayName)}
                      </span>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-semibold text-black-500 truncate group-hover:text-blue-500 transition-colors">
                            {review.reviewer.displayName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getTimeAgo(review.createTime)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-black-500 text-sm">
                            {review.starRating === "FIVE"
                              ? "5.0"
                              : review.starRating === "FOUR"
                              ? "4.0"
                              : review.starRating === "THREE"
                              ? "3.0"
                              : review.starRating === "TWO"
                              ? "2.0"
                              : "1.0"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2 group-hover:text-gray-900">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No reviews available for this location.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Please select a location to view reviews.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewList;
