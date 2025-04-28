import styled from "styled-components";

interface props {
  startopacity: number;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  background-color: #171c25;
`;

export const Container = styled.div<props>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  background-color: #0c1119;
  color: white;

  border-radius: 8px;
  padding: 32px 128px;

  & > div {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    height: 32px;
    width: 32px;

    margin: 8px;

    cursor: pointer;
  }

  opacity: ${(props) => (props.startopacity === 1 ? 1 : 0)};
  transition: opacity 0.1s ease-in;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 64px;
`;

export const AllMessages = styled.ul`
  height: 300px;
  width: 400px;

  overflow-y: scroll;
  scrollbar-color: #000 transparent;
  scrollbar-width: thin;
  scroll-behavior: smooth;

  margin: 32px 0;

  background-color: #171c25;
  border-radius: 8px;

  & > h3 {
    text-align: center;
  }
`;
