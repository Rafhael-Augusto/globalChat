import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logged, setLogged] = useState("");

  const Login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogged("");

    if (username && password) {
      fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.refresh) {
            setLogged("Informações inválidas");
            console.log("Erro ao logar");
          } else {
            setLogged("");
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            console.log("Logado com sucesso!");

            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Erro na autenticacao", err);
        });
    }
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh: refresh,
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem("access_token", data.access);
            console.log("Token de acesso renovado!");

            navigate("/chat");
          } else {
            console.warn("Refresh token invalido ou expirado!");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
        } catch (err) {
          console.log("Erro ao renovar token: ", err);
        }
      }
    };

    refreshAccessToken();
  }, [navigate]);

  const register = () => {
    navigate("/register");
  };

  return (
    <S.Container>
      <S.LogInInfo id="login-form" onSubmit={(e) => Login(e)}>
        <S.Logo
          src="https://images.icon-icons.com/1946/PNG/512/1904663-bubble-chat-comment-communication-message-talk-text_122514.png"
          alt="website logo"
        />

        <S.ImageDiv>
          <S.Image
            src="https://images.icon-icons.com/1415/PNG/512/ic-username_97587.png"
            alt="username"
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="USERNAME"
            maxLength={20}
          />
        </S.ImageDiv>
        <S.ImageDiv>
          <S.Image
            src="https://images.icon-icons.com/569/PNG/512/key-silhouette-security-tool-interface-symbol-of-password_icon-icons.com_54503.png"
            alt="password"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="PASSWORD"
          />
        </S.ImageDiv>

        <S.Warning>{logged}</S.Warning>

        <S.ValidateForm id="validade-form">LOGIN</S.ValidateForm>
        <S.CreateAccount>
          <button onClick={register}>Create account</button>
        </S.CreateAccount>
      </S.LogInInfo>
    </S.Container>
  );
}

export default Login;
