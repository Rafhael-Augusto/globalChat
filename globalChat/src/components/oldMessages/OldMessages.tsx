import { useEffect, useState } from "react";
import * as S from "./styles";
import { useInView } from "react-intersection-observer";

type prop = {
  message: string;
  ownername: string;
  attachment: File;
};

function OldMessageModel({ message, ownername, attachment }: prop) {
  const [attachmentType, setAttachmentType] = useState("");

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
      const attachmentUrl = `https://globalchat-d93i.onrender.com${attachment}`;

      const extension = attachmentUrl.split(".").pop()?.toLowerCase();
      const getAttachmentName = attachmentUrl.split("files/").pop();

      if (extension && getAttachmentName) {
        setAttachmentType(extension);
        isImage(extension);
      }
    }
  }, [attachment]);

  return (
    <S.Wrapper>
      <h2>{ownername}</h2>

      <div>
        <h1>{message}</h1>
        <S.ProfilePicture
          src={
            "https://tr.rbxcdn.com/180DAY-80fe87c42012957cd6e2c9dd75de797d/420/420/Face/Png/noFilter"
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
            src={`http://127.0.0.1:8000${attachment}`}
          />
        ) : inView && attachmentType == "audio" ? (
          <S.AudioAttachment
            controls
            src={`http://127.0.0.1:8000${attachment}`}
          />
        ) : inView && attachmentType == "pdf" ? (
          <S.ItemLink
            target="_blank"
            href={`http://127.0.0.1:8000${attachment}`}
          ></S.ItemLink>
        ) : (
          ""
        )}
      </div>
    </S.Wrapper>
  );
}

export default OldMessageModel;
