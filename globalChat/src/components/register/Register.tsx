import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");

  const [warn, setWarn] = useState("");

  const Register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === rePassword && username) {
      const RegisterUser = async () => {
        const response = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok && !data.username) {
          navigate("/");
        } else {
          setWarn("Erro ao criar conta, por favor tente novamente.");
        }
      };

      RegisterUser();
    } else {
      setWarn("Erro ao criar conta, por favor tente novamente.");
    }
  };

  const Login = () => {
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/");
    }
  });

  return (
    <S.Container>
      <S.LogInInfo id="register-form" onSubmit={(e) => Register(e)}>
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
          />
        </S.ImageDiv>
        <S.ImageDiv>
          <S.Image
            src="https://images.icon-icons.com/614/PNG/512/email-envelope-outline-shape-with-rounded-corners_icon-icons.com_56530.png"
            alt="username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="EMAIL"
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
        <S.ImageDiv>
          <S.Image
            src="https://images.icon-icons.com/569/PNG/512/key-silhouette-security-tool-interface-symbol-of-password_icon-icons.com_54503.png"
            alt="password"
          />
          <input
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
            type="password"
            placeholder="PASSWORD"
          />
        </S.ImageDiv>

        <S.Warning>{warn}</S.Warning>

        <S.ValidateForm>REGISTER</S.ValidateForm>
        <S.CreateAccount>
          <button onClick={Login}>Login</button>
        </S.CreateAccount>
      </S.LogInInfo>
    </S.Container>
  );
}

export default Register;
