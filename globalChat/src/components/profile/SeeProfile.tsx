import { useEffect, useState } from "react";
import * as S from "./styles";
import OldMessageModel from "../oldMessages/OldMessages";
import { useNavigate, useParams } from "react-router-dom";

type UserInfoAPI = {
  id: number;
  text: string;
  attachment: File;
  avatar: File;
  owner_username: string;
  owner_id: number;
};

function SeeProfile() {
  const navigate = useNavigate();

  const [userInfos, setUserInfos] = useState<UserInfoAPI[]>([]);

  const { id } = useParams();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          "https://globalchat-d93i.onrender.com/api/messages/get/"
        );
        const data = await res.json();
        setUserInfos(data);
      } catch (err) {
        console.log("erro pegando informacoes de usuario", err);
      }
    };

    getMessages();
  }, []);

  useEffect(() => {
    const userMessage = userInfos.find(
      (message) => Number(id) === message.owner_id
    );

    if (userMessage) {
      setName(userMessage.owner_username);
      setAvatar(userMessage.avatar);
    }
  }, [id, userInfos]);

  useEffect(() => {
    const turnVisible = () => {
      setVisible(1);
    };

    setTimeout(turnVisible, 600);
  }, []);

  return (
    <S.Wrapper>
      <S.Container startopacity={visible}>
        <span onClick={() => navigate("/chat")}>&lt;</span>
        <div>
          <S.ProfilePicture
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : "https://media.tenor.com/3_HgqppkCwUAAAAM/egg-dancing.gif"
            }
            alt="PFP"
          />
          <h1>{name ? name : "carregando"}</h1>
        </div>

        <S.AllMessages>
          <h3>Ultimas mensagens</h3>

          {userInfos.map((message) => {
            if (Number(id) !== message.owner_id) return;
            return (
              <OldMessageModel
                key={message.id}
                message={message.text}
                ownername={message.owner_username}
                attachment={message.attachment}
              />
            );
          })}
        </S.AllMessages>
      </S.Container>
    </S.Wrapper>
  );
}

export default SeeProfile;
