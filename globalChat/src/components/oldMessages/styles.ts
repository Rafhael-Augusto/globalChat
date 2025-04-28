import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  margin-left: 8px;

  & > h2 {
    text-align: start;
    font-size: 12px;
    color: white;

    font-family: "Inter", sans-serif;

    opacity: 1;
    transition: opacity 0.1s ease-in-out;

    margin-top: 16px;
    margin-left: 2px;
  }

  & > div {
    display: flex;
    word-break: break-all;

    max-width: 100%;

    flex-direction: row-reverse;
    justify-content: start;

    & > h1 {
      display: inline-block;
      font-size: 12px;

      background-color: #1b2532;
      color: white;
      margin: 4px 0;
      padding: 8px 12px;

      border-radius: 4px;

      font-family: "Inter", sans-serif;

      max-width: 70%;
    }

    opacity: 1;
    transition: opacity 0.1s ease-in;
  }
`;

export const ProfilePicture = styled.img`
  display: inline-block;
  height: 32px;
  width: 32px;
  vertical-align: top;

  margin: 4px;
  border-radius: 50%;

  background-color: white;
`;

export const ImageAttachment = styled.img`
  max-height: 280px;
  max-width: 280px;
  border-radius: 8px;
  border: 2px solid #0c1119;
`;

export const VideoAttachment = styled.video`
  max-height: 280px;
  max-width: 280px;
  border-radius: 8px;
  border: 2px solid #0c1119;
`;

export const AudioAttachment = styled.audio`
  max-height: 280px;
  max-width: 280px;
`;

export const ItemLink = styled.a`
  background-color: #0c1119;
  padding: 8px;
  border-radius: 8px;
  color: cyan;
`;
