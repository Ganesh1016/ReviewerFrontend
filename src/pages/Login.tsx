import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const handleGoogleSignIn = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/business.manage",
    flow: "auth-code", // Use auth-code for offline access and backend exchange
    onSuccess: async (response) => {
      console.log("Google response:", response);

      try {
        // Send the authorization code to the backend
        const { code } = response;
        const result = await axios.post(
          "http://localhost:7000/api/auth/google",
          {
            code,
          }
        );

        console.log("Backend response:", result.data);

        // Use result.data to navigate or store user information
        alert("Successfully authenticated!");
      } catch (error) {
        console.error("Error communicating with the backend:", error);
        alert("Failed to authenticate with Google.");
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
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
