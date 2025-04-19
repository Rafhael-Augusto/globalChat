import * as S from './styles'

function OpenSettings() {

    return (
        <S.Wrapper>
             <div>
                <h1>Settings</h1>

                <S.SettingsBG>
                    <h2>Avatar</h2>
                    <form>
                        <S.ChangeAvatarInput id='change-avatar' type="file" />
                        <S.ChangeAvatarButton htmlFor="change-avatar"></S.ChangeAvatarButton>
                    </form>
                </S.SettingsBG>
             </div>
        </S.Wrapper>
    )
}

export default OpenSettings