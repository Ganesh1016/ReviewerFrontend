import { useState } from "react";
import { Star, Loader } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReplySection = () => {
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Reply saved successfully!");
      setReply("");
    }, 1000);
  };

  const handleDelete = () => {
    setReply("");
    toast.info("Reply deleted");
  };

  return (
    <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reply to Review</h2>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">John Doe</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">2023-05-01</p>
        <p className="text-sm">
          Great product, highly recommended! The quality exceeded my
          expectations, and the customer service was excellent. I'll definitely
          be purchasing from this company again in the future.
        </p>
      </div>
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
          onClick={handleDelete}
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
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ReplySection;
