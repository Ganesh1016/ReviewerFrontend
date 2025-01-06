import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google response:", response);

      setLoading(true); // Start loader

      try {
        // Fetch user's profile information using the access token
        const { access_token } = response;

        // Fetch user info (e.g., email) from Google API
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        console.log("Google User Info:", userInfo.data);

        console.log(userInfo.data.email);

        // Send the email to the backend for authentication
        const result = await axios.post(
          "http://127.0.0.1:7000/api/auth/google",
          {
            email: userInfo.data.email,
          }
        );

        console.log("Backend response:", result.data);

        // Navigate to the dashboard if authentication is successful
        navigate("/dashboard/overview");
      } catch (error: unknown) {
        console.error("Error authenticating user:", error);

        // Use a type guard to narrow the type of `error`
        if (axios.isAxiosError(error)) {
          // Handle user not found case
          if (error.response?.status === 404) {
            alert(error.response.data.detail);
          } else {
            alert("Failed to authenticate. Please try again.");
          }
        } else {
          alert("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Stop loader
      }
    },
    onError: () => {
      console.error("Google Sign-In was unsuccessful");
      setLoading(false); // Stop loader
    },
  });

  const handleOnClick = () => {
    handleGoogleSignIn();
  };

  return (
    <div className="flex font-poppins flex-col items-center justify-center min-h-screen bg-white-500 text-center">
      <div className="bg-white-800 p-8 rounded-md border-4 border-blue">
        <h1 className="text-4xl font-semibold text-black-500 mb-4">
          Welcome to Reviewer
        </h1>
        <p className="text-lg text-gray-600 mb-6">Let's get started</p>
        {loading ? (
          <p className="text-lg font-medium text-gray-600">Authenticating...</p>
        ) : (
          <Button
            className="bg-blue-500 text-white-500 hover:bg-blue-600 hover:text-white-800 font-medium px-6 py-3 rounded-md transition-all duration-300"
            onClick={handleOnClick}
          >
            Sign in with Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
