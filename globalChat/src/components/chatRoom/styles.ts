import styled from "styled-components";

export const Messages = styled.div`
  background-color: #0c1119;
  overflow-y: scroll;

  max-width: 400px;
  height: 400px;
  width: 100%;
  scrollbar-color: #000 transparent;
  scrollbar-width: thin;

  padding: 8px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background-color: #0b1119;
  height: 64px;
  width: 400px;

  border-bottom: 2px solid #171c25;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #171c25;

  height: 100vh;

  * {
    font-family: "Inter", sans-serif;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  background-color: #0b1119;
  height: 64px;
  width: 400px;

  border-top: 2px solid #171c25;
`;

export const SendButton = styled.button`
  background-color: #284e91;
  color: white;

  border: none;
  border-radius: 4px;
  height: 40px;
  width: 64px;

  cursor: pointer;
`;

export const MessageBar = styled.input`
  background-color: #0c1119;
  color: white;

  font-size: 16px;

  height: 40px;
  width: 70%;

  border: 2px solid #171c25;
  border-radius: 8px;

  padding: 8px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
  }
`;

export const AddDocument = styled.input`
  display: none;
`;

export const DocumentPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  background-color: #171c25;
  border-radius: 8px;

  background-color: red;

  & > img,
  video {
    top: -100px;
    left: -2px;

    position: absolute;
    max-height: 80px;
    max-width: 80px;

    border: 2px solid #171c25;
    border-radius: 8px;
  }

  & > video {
    object-fit: cover;
    height: 80px;
    width: 80px;
  }
`;

export const AddDocumentButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #171c25;

  font-family: sans-serif;

  border-radius: 50%;

  color: white;
  font-size: 32px;
  height: 32px;
  width: 32px;

  cursor: pointer;
`;

export const Settings = styled.img`
  top: 0;
  right: 0;
  position: absolute;

  background-color: transparent;
  margin: 16px;

  width: 38px;
  height: 38px;

  cursor: pointer;

  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.2) rotate(360deg);
  }
`;

export const Container = styled.div`
  position: relative;
`;
