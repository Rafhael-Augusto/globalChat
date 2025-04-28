import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #171c25;
  color: white;

  height: 100vh;
`;

export const Container = styled.div`
  position: relative;
  text-align: center;
  background-color: #0b1119;

  height: 400px;
  width: 400px;

  border-radius: 8px;

  transition: all 0.1s ease-in;

  & > h1 {
    border-bottom: 2px solid #171c25;
    padding: 8px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    margin: 32px;

    & > form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
  }

  & > span {
    position: absolute;
    top: 2px;
    left: 8px;

    cursor: pointer;
    font-size: 20px;
  }
`;

export const ProfilePicture = styled.img`
  height: 128px;
  width: 128px;
  border: 4px solid #171c25;
  border-radius: 50%;

  cursor: pointer;
  object-fit: fill;

  background-color: #0c1119;

  &:hover {
    filter: grayscale(50%);
  }
`;

export const Username = styled.h2`
  padding: 4px;
  background-color: #171c25;
  border-radius: 8px;

  width: 200px;
  cursor: pointer;
`;

export const NewUsername = styled.input`
  color: white;
  background-color: #171c25;
  border-radius: 8px;
  border: none;

  text-align: center;

  padding: 8px;
`;

export const Submit = styled.button`
  color: white;
  background-color: #284e91;
  text-align: center;

  border-radius: 8px;
  border: none;
  padding: 8px;

  cursor: pointer;

  &:hover {
    border: 2px solid white;
  }
`;
