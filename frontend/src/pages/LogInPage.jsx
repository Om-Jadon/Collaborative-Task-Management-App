import Login from "../components/Login";
import loginBG from "../assets/login.jpg";

function LogInPage() {
  return (
    <div
      className="signup-page-container flex h-[100vh] justify-center items-center"
      style={{
        backgroundImage: `url(${loginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-60 h-full w-full flex justify-center items-center">
        <Login />
      </div>
    </div>
  );
}

export default LogInPage;
