import { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

function PersonalProfile() {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const pfpRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState(0);

  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);

  useEffect(() => {
    const setLoaded = () => {
      setIsLoaded(true);
    };
    setTimeout(setLoaded, 500);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchInfo = async () => {
      try {
        const res = await fetch(
          "https://globalchat-d93i.onrender.com/api/user-info/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok)
          throw new Error("Erro na resposta da api o meu Deus do CEU");

        const data = await res.json();
        setUserName(data.username);
      } catch (err) {
        console.error("erro ao buscar dados do usuario", err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <S.Wrapper>
      <S.Container style={{ opacity: isLoaded ? 1 : 0 }}>
        <span onClick={() => navigate("/chat")}>&lt;</span>
        <h1>Perfil</h1>

        <div>
          <form>
            <input type="file" style={{ display: "none" }} ref={pfpRef} />

            <S.ProfilePicture
              onClick={() => setClick(!click)}
              src={
                "https://i.pinimg.com/236x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg"
              }
              alt="Profile Picture"
            />
            <S.Username onClick={() => setClick2(!click2)}>
              {userName}
            </S.Username>

            <h3 style={{ display: click ? "block" : "none" }}>
              Da pra mudar a foto nao man
            </h3>
            <h3 style={{ display: click2 ? "block" : "none" }}>
              Da pra mudar o nome tambem nao man
            </h3>
          </form>
        </div>
      </S.Container>
    </S.Wrapper>
  );
}

export default PersonalProfile;
