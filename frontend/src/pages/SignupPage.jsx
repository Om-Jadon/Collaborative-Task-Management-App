import SignUp from "../components/SignUp";
import signupBg from "../assets/signup.jpg";

function SignupPage() {
  return (
    <div
      className="signup-page-container flex h-[100vh] justify-center items-center"
      style={{
        backgroundImage: `url(${signupBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-60 h-full w-full flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  );
}

export default SignupPage;
