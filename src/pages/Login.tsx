import { Button } from "@/components/ui/button";

const Login = () => {
  const handleGoogleSignIn = () => {
    // Logic for Google sign-in (to be implemented later)
    console.log("Google Sign-In clicked");
  };

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
