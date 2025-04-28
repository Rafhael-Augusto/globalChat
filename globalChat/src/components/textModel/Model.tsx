import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

type prop = {
  message: string;
  messageOwner: number;
  messageid: number;
  ownername: string;
  attachment?: string;
};

function TextModel({
  message,
  messageOwner,
  ownername,
  messageid,
  attachment,
}: prop) {
  const navigate = useNavigate();

  const [id, setId] = useState(0);

  const sameId = messageOwner - id;

  const [visible, setVisible] = useState(0);
  const [editedMessage, setEditedMessage] = useState("");

  const [openOptions, setOpenOptions] = useState(false);
  const [hideText, setHideText] = useState(false);

  const [attachmentType, setAttachmentType] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "400px 0px",
  });

  useEffect(() => {
    const isPdf = (extension: string) => {
      if (extension === "pdf") {
        setAttachmentType("pdf");
      }
    };

    const isAudio = (extension: string) => {
      const audioTypes = ["mp3", "wav"];
      if (audioTypes.find((item) => item === extension)) {
        setAttachmentType("audio");
      } else {
        isPdf(extension);
      }
    };

    const isVideo = (extension: string) => {
      const videoTypes = ["mp4", "webm", "ogg"];
      if (videoTypes.find((item) => item === extension)) {
        setAttachmentType("video");
      } else {
        isAudio(extension);
      }
    };

    const isImage = (extension: string) => {
      const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
      if (imageTypes.find((item) => item === extension)) {
        setAttachmentType("image");
      } else {
        isVideo(extension);
      }
    };

    if (attachment) {
      const attachmentUrl = `http://127.0.0.1:8000${attachment}`;

      const extension = attachmentUrl.split(".").pop()?.toLowerCase();
      const getAttachmentName = attachmentUrl.split("files/").pop();

      if (extension && getAttachmentName) {
        setAttachmentType(extension);
        isImage(extension);
        setAttachmentName(getAttachmentName);
      }
    }
  }, [attachment]);

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
        setId(data.id);
      } catch (err) {
        console.error("erro ao buscar dados do usuario", err);
        navigate("/");
      }
    };

    fetchInfo();
  }, [navigate]);

  useEffect(() => {
    const turnVisible = () => {
      setVisible(1);
    };

    setTimeout(turnVisible, 200);
  }, []);

  const OpenChatMenu = () => {
    if (sameId === 0) {
      setOpenOptions(!openOptions);
    }
  };

  const UpdateMessage = () => {
    setHideText(!hideText);
    const Update = () => {
      fetch(
        `https://globalchat-d93i.onrender.com/api/messages/update/${messageid}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: editedMessage,
          }),
        }
      );
    };

    if (hideText) {
      Update();
    }
  };

  const DeleteMessage = () => {
    fetch(
      `https://globalchat-d93i.onrender.com/api/messages/delete/${messageid}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <S.Wrapper visibility={visible} messageowner={sameId === 0 ? 0 : 1}>
      <S.NameDiv visibility={visible} messageowner={sameId === 0 ? 0 : 1}>
        <h2 onClick={() => navigate(`/profile/${messageOwner}`)}>
          {ownername}
        </h2>
      </S.NameDiv>

      <div>
        <S.EditMessage
          style={{ display: openOptions ? "inline-block" : "none" }}
        >
          <ul>
            <li
              onClick={() => {
                UpdateMessage();
                setEditedMessage(message);
              }}
            >
              Editar
            </li>
            <li
              style={{ display: !hideText ? "inline-block" : "none" }}
              onClick={DeleteMessage}
            >
              Deletar
            </li>
            <li
              style={{ display: hideText ? "inline-block" : "none" }}
              onClick={() => {
                setHideText(!hideText);
                setEditedMessage(message);
              }}
            >
              Cancelar
            </li>
          </ul>
        </S.EditMessage>

        <textarea
          id={`edit-message-"${messageid}`}
          maxLength={500}
          minLength={1}
          value={editedMessage}
          style={{ display: !hideText ? "none" : "inline-block" }}
          onChange={(e) => setEditedMessage(e.target.value)}
        ></textarea>
        <h1
          style={{
            cursor: sameId === 0 ? "pointer" : "default",
            display: hideText ? "none" : "inline-block",
          }}
          onClick={OpenChatMenu}
        >
          {message}
        </h1>
        <S.Avatar
          src={
            "https://i.pinimg.com/236x/d1/70/99/d17099bc26cf4cb9db8fbef0d6d6f8ca.jpg"
          }
          alt="Man face profile picture"
        />
      </div>
      <div ref={ref}>
        {inView && attachmentType === "image" ? (
          <S.ImageAttachment
            loading={"lazy"}
            src={`https://globalchat-d93i.onrender.com${attachment}`}
          />
        ) : inView && attachmentType == "video" ? (
          <S.VideoAttachment
            controls
            loop={true}
            src={`https://globalchat-d93i.onrender.com${attachment}`}
          />
        ) : inView && attachmentType == "audio" ? (
          <S.AudioAttachment
            controls
            src={`https://globalchat-d93i.onrender.com${attachment}`}
          />
        ) : inView && attachmentType == "pdf" ? (
          <S.ItemLink
            target="_blank"
            href={`https://globalchat-d93i.onrender.com${attachment}`}
          >
            {attachmentName}
          </S.ItemLink>
        ) : (
          ""
        )}
      </div>
    </S.Wrapper>
  );
}

export default TextModel;
