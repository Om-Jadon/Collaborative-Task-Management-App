import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [viewPass, setViewPass] = useState(false);
  const [viewConfirmPass, setViewConfirmPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <form
      className="bg-[#222831] p-8 rounded-lg shadow-md w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl text-center text-[#EEEEEE] font-bold mb-6">
        Sign Up
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="form-group mb-4">
        <label
          htmlFor="username"
          className="block text-[#EEEEEE] font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-[#6f747e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] bg-[#393E46] text-[#EEEEEE] placeholder-gray-400"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email" className="block text-[#EEEEEE] font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-[#6f747e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] bg-[#393E46] text-[#EEEEEE] placeholder-gray-400"
        />
      </div>
      <div className="form-group mb-4 relative">
        <label
          htmlFor="password"
          className="block text-[#EEEEEE] font-bold mb-2"
        >
          Password
        </label>
        <input
          type={viewPass ? "text" : "password"}
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-[#6f747e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] bg-[#393E46] text-[#EEEEEE] placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setViewPass(!viewPass)}
          className="absolute right-3 top-[53px] transform -translate-y-1/2 text-gray-300"
        >
          <FontAwesomeIcon icon={viewPass ? faEyeSlash : faEye} />
        </button>
      </div>
      <div className="form-group mb-4 relative">
        <label
          htmlFor="confirmPassword"
          className="block text-[#EEEEEE] font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type={viewConfirmPass ? "text" : "password"}
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-[#6f747e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5] bg-[#393E46] text-[#EEEEEE] placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setViewConfirmPass(!viewConfirmPass)}
          className="absolute right-3 top-[53px] transform -translate-y-1/2 text-gray-300"
        >
          <FontAwesomeIcon icon={viewConfirmPass ? faEyeSlash : faEye} />
        </button>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#00ADB5] text-[#EEEEEE] py-2 rounded-lg hover:bg-[#00a1a8] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignUp;
