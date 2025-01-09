import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice"; // Импортируйте ваш селектор

const useRequireAuth = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
};

export default useRequireAuth;
