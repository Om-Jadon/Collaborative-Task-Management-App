import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  deleteUser,
  updatePassword,
  clearError,
  clearSuccess,
} from "../slices/authSlice";

function Profile({ profile }) {
  const [username] = useState(profile.username);
  const [email] = useState(profile.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
  }, [error, success, dispatch]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (newPassword === currentPassword) {
      alert("New password must be different from current password");
      return;
    }
    dispatch(updatePassword({ id: profile.id, currentPassword, newPassword }));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    clearError();
    clearSuccess();
  };

  const handleProfilePicChange = () => {
    // Logic to change the user's profile picture goes here
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      dispatch(deleteUser());
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="flex bg-[#EEEEEE] justify-center items-center h-[100vh] relative">
        {/* Back to Dashboard Button */}
        <button
          className="absolute top-4 left-4 bg-[#00ADB5] text-[#EEEEEE] ptext-[#EEEEEE] px-4 py-2 rounded-lg font-semibold flex items-center"
          onClick={() => navigate("/dashboard")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Dashboard
        </button>

        <div className="w-[70vw] h-[100vh] flex justify-center items-center">
          <div className="bg-[#393E46] rounded-xl shadow-md w-[65vw] h-[85vh] flex flex-col ">
            <div className="bg-[#222831] rounded-t-xl shadow-md py-5 px-8">
              <h1 className="text-[#EEEEEE] text-3xl font-bold">My Account</h1>
            </div>

            <form className="px-8 py-5">
              <div className="mb-4">
                <label className="text-[#EEEEEE] mb-2 block font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  className="w-full p-2 rounded-lg bg-[#222831] text-[#EEEEEE]"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="text-[#EEEEEE] mb-2 block font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="w-full p-2 rounded-lg bg-[#222831] text-[#EEEEEE]"
                  disabled
                />
              </div>
            </form>

            <div className="border-t border-[#6f747e] my-5 w-[90%] mx-auto"></div>
            <form onSubmit={handlePasswordChange} className="px-8 py-5">
              <h2 className="text-[#EEEEEE] text-2xl mb-4 font-semibold">
                Change Password
              </h2>
              <div className="mb-4">
                <label className="text-[#EEEEEE]">Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[#EEEEEE]">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[#EEEEEE]">Confirm New Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded-lg"
                  required
                />
              </div>
              <div className=" flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00ADB5] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold"
                >
                  {loading ? "Processing" : "Change Password"}
                </button>
                {error && (
                  <p className="text-red-500 text-center font-semibold">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-green-500 text-center font-semibold">
                    {success}
                  </p>
                )}
              </div>
            </form>

            <div className="border-t border-[#6f747e] my-5 w-[90%] mx-auto"></div>
            <div className="px-8 py-5 flex justify-between">
              <h2 className="text-[#EEEEEE] text-2xl mb-4 font-semibold">
                Danger Zone
              </h2>
              <button
                className="bg-red-600 text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="w-[30vw] h-[100vh] flex justify-center items-start ">
          <div className="bg-[rgb(57,62,70)] rounded-xl shadow-md w-[25vw] h-[50vh] mt-[3.625vw] flex flex-col items-center justify-start relative">
            <div className="relative mt-12">
              <img
                src={profile.pic}
                alt="Profile"
                className="rounded-full w-[15vw] h-[15vw]"
              />
              <button
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 rounded-full"
                onClick={handleProfilePicChange}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-white text-2xl"
                />
              </button>
            </div>

            <button
              className="bg-red-600 text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold absolute bottom-4"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
