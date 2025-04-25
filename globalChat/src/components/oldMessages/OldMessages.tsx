import * as S from "./styles";

type prop = {
  message: string;
  ownername: string;
};

function OldMessageModel({ message, ownername }: prop) {
  return (
    <S.Wrapper>
      <h2>{ownername}</h2>

      <div>
        <h1>{message}</h1>
        <img
          src={
            "https://tr.rbxcdn.com/180DAY-80fe87c42012957cd6e2c9dd75de797d/420/420/Face/Png/noFilter"
          }
          alt="Man face profile picture"
        />
      </div>
    </S.Wrapper>
  );
}

export default OldMessageModel;
