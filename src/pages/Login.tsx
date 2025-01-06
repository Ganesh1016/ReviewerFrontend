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
    <div className="flex font-poppins flex-col items-center justify-center min-h-screen bg-white-500 text-center">
      <div className="bg-white-800 p-8 rounded-md border-4 border-blue">
        <h1 className="text-4xl font-semibold text-black-500 mb-4">
          Welcome to Reviewer
        </h1>
        <p className="text-lg text-gray-600 mb-6">Let's get started</p>
        <Button
          className="bg-blue-500 text-white-500 hover:bg-blue-600 hover:text-white-800 font-medium px-6 py-3 rounded-md transition-all duration-300"
          onClick={() => handleGoogleSignIn()}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
