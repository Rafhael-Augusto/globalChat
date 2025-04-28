import styled from "styled-components";

interface Owner {
  messageowner: number;
  visibility: number;
}

export const NameDiv = styled.div<Owner>`
  display: flex;

  & > h2 {
    justify-content: ${(props) => (props.messageowner !== 0 ? "start" : "end")};

    font-size: 12px;
    color: white;

    font-family: "Inter", sans-serif;

    opacity: ${(props) => (props.visibility === 1 ? 1 : 0)};
    transition: opacity 0.1s ease-in-out;

    margin-top: 16px;
    cursor: pointer;
  }
`;

export const Wrapper = styled.div<Owner>`
  position: relative;

  & > div {
    display: flex;
    word-break: break-all;

    max-width: 100%;

    flex-direction: ${(props) =>
      props.messageowner !== 0 ? "row-reverse" : "row"};
    justify-content: ${(props) => (props.messageowner !== 0 ? "start" : "end")};

    & > h1 {
      display: inline-block;
      font-size: 12px;

      background-color: ${(props) =>
        props.messageowner === 0 ? "#284E91" : "#1B2532"};
      color: white;
      margin: 4px 0;
      padding: 8px 12px;

      border-radius: 4px;

      font-family: "Inter", sans-serif;

      max-width: 70%;

      cursor: pointer;
    }

    & > textarea {
      display: inline-block;
      font-size: 12px;

      background-color: #284e91;
      color: white;
      margin: 4px 0;
      padding: 8px 12px;

      border-radius: 4px;
      border: none;

      font-family: "Inter", sans-serif;

      max-width: 70%;

      resize: none;
    }

    opacity: ${(props) => (props.visibility === 1 ? 1 : 0)};
    transition: opacity 0.1s ease-in;
  }
`;

export const FileDiv = styled.div<Owner>`
  display: flex;

  max-width: 100%;

  flex-direction: ${(props) =>
    props.messageowner !== 0 ? "row-reverse" : "row"};
  justify-content: ${(props) => (props.messageowner !== 0 ? "start" : "end")};
`;

export const Avatar = styled.img`
  display: inline-block;
  height: 32px;
  width: 32px;
  vertical-align: top;

  margin: 4px;
  border-radius: 50%;

  background-color: white;
`;

export const EditMessage = styled.div`
  height: 100%;
  width: 15%;
  background-color: rgba(0, 0, 0, 0.4);

  border-radius: 8px;
  margin-right: 8px;
  margin-top: 1px;

  & > ul {
    text-align: center;
    margin: 4px 0;
    color: white;

    & > li {
      font-size: 12px;
      list-style-type: none;
      cursor: pointer;

      &:hover {
        color: gray;
      }
    }
  }
`;

export const ImageAttachment = styled.img`
  max-height: 280px;
  max-width: 280px;
  border-radius: 8px;
  border: 2px solid #171c25;
`;

export const VideoAttachment = styled.video`
  max-height: 280px;
  max-width: 280px;
  border-radius: 8px;
  border: 2px solid #171c25;
`;

export const AudioAttachment = styled.audio`
  max-height: 280px;
  max-width: 280px;
`;

export const ItemLink = styled.a`
  background-color: #171c25;
  padding: 8px;
  border-radius: 8px;
  color: cyan;
`;
