import * as S from './styles'

type prop = {
    message: string,
    messageOwner: number,
    avatar: string,
}

function TextModel({ message, messageOwner, avatar }: prop) {
    return (
        <S.Wrapper messageowner={messageOwner}>
            <h1>{message}</h1>
            <img src={avatar ? avatar : 'https://static.wikia.nocookie.net/769e8f71-bf1a-47d5-a75b-477516f53f1b/scale-to-width/755'} alt="" />
        </S.Wrapper>
    )
}

export default TextModel