import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../slices/authSlice";

function Login() {
  const [viewPass, setViewPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <form
      className="bg-[#222831] p-8 rounded-lg shadow-md w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl text-center text-[#EEEEEE] font-bold mb-6">
        Login
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#00ADB5] text-[#EEEEEE] py-2 rounded-lg hover:bg-[#00a1a8] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
