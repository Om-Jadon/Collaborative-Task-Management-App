import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const authToken = token;
    if (!authToken) {
      navigate("/login"); // Redirect to login if no token is found
    } else {
      fetchUserProfile(authToken);
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        navigate("/login"); // Redirect if token is invalid
      }
    } catch (err) {
      navigate("/login"); // Handle error and redirect to login
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <Profile profile={profile.user} />
    </div>
  );
};

export default ProfilePage;
