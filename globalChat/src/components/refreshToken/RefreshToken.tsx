import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RefreshToken() {
  const navigate = useNavigate();

  useState(() => {
    const fetchUserInfo = async () => {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      try {
        const res = await fetch("http://localhost:8000/api/user-info/", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401 && refresh) {
          const refreshRes = await fetch(
            "http://localhost:8000/api/token/refresh/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: refresh }),
            }
          );

          if (refreshRes.ok) {
            const newToken = await refreshRes.json();
            localStorage.setItem("access_token", newToken.access);

            return fetchUserInfo();
          } else {
            localStorage.clear();
            navigate("/");
          }
        }

        if (res.ok) {
          console.log("okay");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfo();
    const interval = setInterval(fetchUserInfo, 10000);

    return () => clearInterval(interval);
  });

  return null;
}

export default RefreshToken;
