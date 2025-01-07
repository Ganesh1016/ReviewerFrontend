import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google response:", response);

      try {
        const { access_token } = response;

        // Fetch user info from Google API
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        console.log("Google User Info:", userInfo.data);

        // Authenticate the user with your backend
        const result = await axios.post(
          "http://127.0.0.1:7000/api/auth/google",
          {
            email: userInfo.data.email,
          }
        );

        console.log("Backend response:", result.data);

        // Dispatch user data to Redux store
        dispatch(setUser(result.data));

        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(result.data));

        navigate("/dashboard/overview");
      } catch (error: unknown) {
        console.error("Error authenticating user:", error);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            alert(error.response.data.detail);
          } else {
            alert("Failed to authenticate. Please try again.");
          }
        } else {
          alert("An unexpected error occurred.");
        }
      }
    },
    onError: () => {
      console.error("Google Sign-In was unsuccessful");
    },
  });

  return (
    <div className="flex font-poppins flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to <span className="text-blue-500">Reviewer</span>
        </h1>
        <p className="text-base text-gray-600 mb-6">
          Manage and analyze your reviews effectively.
        </p>
        <Button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
          onClick={() => handleGoogleSignIn()}
        >
          Sign in with Google
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
