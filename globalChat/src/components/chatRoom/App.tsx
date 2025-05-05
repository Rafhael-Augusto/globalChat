import { useEffect, useRef, useState } from "react";

import TextModel from "../textModel/Model";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";

type InfoApi = {
  id: number;
  owner_id: number;
  text: string;
  attachment: string;
  avatar: string;
  owner_username: string;
};

function App() {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [messages, setMessages] = useState<InfoApi[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const CreateText = (e: React.FormEvent) => {
    e.preventDefault();
    setAttachment(null);

    if (selectFileRef.current) {
      selectFileRef.current.value = "";
    }

    if (text) {
      const token = localStorage.getItem("access_token");

      if (token) {
        const formData = new FormData();

        formData.append("text", text);

        if (attachment) {
          formData.append("attachment", attachment);
        }

        fetch("http://localhost:8000/api/messages/post/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Mensagem enviada", data);
          })
          .catch((err) => console.log("Erro ao enviar", err));

        setText("");
      }
    }
  };

  const ScrollToBottom = () => {
    const container = document.getElementById("text-form");

    if (container) {
      container.scrollTop = container.scrollHeight;

      if (!isLoaded) {
        setIsLoaded(true);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/messages/get/");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("erro ao buscar mensagems no banco de dados:", err);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 1000);

    return () => clearInterval(interval);
  }, []);

  const prevLength = useRef(0);

  useEffect(() => {
    if (messages.length > prevLength.current) {
      setTimeout(ScrollToBottom, 500);
      setTimeout(ScrollToBottom, 1200);
    }

    prevLength.current = messages.length;
  }, [messages]);

  const selectFileRef = useRef<HTMLInputElement>(null);
  const attachmentNameRef = useRef("");

  const [attachmentType, setAttachmentType] = useState("");

  useEffect(() => {
    const isVideo = (extension: string) => {
      const videoTypes = ["mp4", "webm", "ogg"];
      if (videoTypes.find((item) => item === extension)) {
        setAttachmentType("video");
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
      const extension = attachment.name.split(".").pop()?.toLowerCase();
      if (extension) {
        isImage(extension);
      }
    }
  });

  useEffect(() => {
    attachmentNameRef.current = "";
    if (attachment) {
      attachmentNameRef.current = attachment.name;
      setText(attachmentNameRef.current);
    }
  }, [attachment]);

  const [urlPreview, setUrlPreview] = useState("");
  const UrlPreviewRef = useRef("");

  useEffect(() => {
    if (attachment) {
      UrlPreviewRef.current = URL.createObjectURL(attachment);

      setUrlPreview(UrlPreviewRef.current);
      return () => URL.revokeObjectURL(UrlPreviewRef.current);
    }
  }, [attachment]);

  return (
    <S.Container>
      <S.Settings
        onClick={() => navigate("/profile")}
        src="https://images.icon-icons.com/1507/PNG/512/preferencesother_103775.png"
        alt="Settings"
      />
      <S.Wrapper>
        <S.Title>Public Chat</S.Title>

        <S.Messages
          style={{ scrollBehavior: isLoaded ? "smooth" : "unset" }}
          id="text-form"
        >
          {messages.map((currentMessage) => {
            return (
              <div key={currentMessage.id}>
                <TextModel
                  messageid={currentMessage.id}
                  message={currentMessage.text}
                  ownername={currentMessage.owner_username}
                  messageOwner={currentMessage.owner_id}
                  attachment={
                    currentMessage.attachment
                      ? currentMessage.attachment
                      : undefined
                  }
                />
              </div>
            );
          })}
        </S.Messages>

        <S.Form
          autoComplete="false"
          id="message-form"
          onSubmit={(e) => CreateText(e)}
        >
          <S.AddDocument
            ref={selectFileRef}
            onChange={(e) => {
              if (e.target.files && !attachment) {
                setAttachment(e.target.files?.[0]);
                console.log(e.target.files[0]);
              }
            }}
            type="file"
            id="send-file"
          />
          <div
            style={{
              position: "relative",
            }}
          >
            <S.DocumentPreview
              style={{ display: attachment ? "block" : "none" }}
            >
              {attachmentType === "image" ? (
                <img
                  src={urlPreview ? urlPreview : undefined}
                  alt={attachment?.name}
                />
              ) : (
                <video
                  muted={true}
                  autoPlay={true}
                  src={urlPreview ? urlPreview : undefined}
                />
              )}
            </S.DocumentPreview>

            <S.AddDocumentButton
              onClick={() => {
                if (attachment && selectFileRef.current) {
                  selectFileRef.current.value = "";
                  setAttachment(null);
                } else {
                  selectFileRef.current?.click();
                }
              }}
            >
              {attachment ? "-" : "+"}
            </S.AddDocumentButton>
          </div>
          <S.MessageBar
            maxLength={500}
            placeholder="Escreva sua mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
          <S.SendButton>Enviar</S.SendButton>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
}

export default App;
