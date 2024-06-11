import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/auth.slice";
import { apiAxios } from "../app/api";

const WithTeacherRole = ({ element }) => {
  const [loading, setLoading] = useState(true);

  const userRole = useSelector((state) => state.auth.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await apiAxios.get("/auth/check");
        dispatch(login(response.data));
        console.log(response)
        if (response.data.role !== 'TEACHER') {
          navigate("/login"); 
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }
    return userRole === 'TEACHER' ? element : "You are not allowed to access this page";

};

export default WithTeacherRole;
