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
      <Login />
    </div>
  );
}

export default LogInPage;
