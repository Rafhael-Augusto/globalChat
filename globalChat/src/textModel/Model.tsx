import { useEffect, useState } from "react";
import * as S from "./styles";

type prop = {
  message: string;
  messageOwner: number;
  ownername: string;
};

function TextModel({ message, messageOwner, ownername }: prop) {
  const [id, setId] = useState(0);

  const sameId = messageOwner - id;

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchInfo = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user-info/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok)
          throw new Error("Erro na resposta da api o meu Deus do CEU");

        const data = await res.json();
        setId(data.id);
      } catch (err) {
        console.error("erro ao buscar dados do usuario", err);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const turnVisible = () => {
      setVisible(1);
    };

    setTimeout(turnVisible, 600);
  }, []);

  return (
    <S.Wrapper visibility={visible} messageowner={sameId === 0 ? 0 : 1}>
      <h2>{ownername}</h2>
      
      <div>
      <S.EditMessage>
          <ul>
            <li>Deletar</li>
            <li>Editar</li>
          </ul>
        </S.EditMessage>
      <h1>{message}</h1>
        <img src={'https://tr.rbxcdn.com/180DAY-80fe87c42012957cd6e2c9dd75de797d/420/420/Face/Png/noFilter'} alt="Man face profile picture" />
      </div>
    </S.Wrapper>
  );
}

export default TextModel;
