import * as S from './styles'

function OpenSettings() {

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem("access_token");
        const formData = new FormData()

        console.log(token)

        if (e.target.files && e.target.files[0]) {
            formData.append('image', e.target.files[0])

            fetch('http://127.0.0.1:8000/api/upload-image/', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    }

    return (
        <S.Wrapper>
             <div>
                <h1>Settings</h1>

                <S.SettingsBG>
                    <h2>Avatar</h2>
                    <form>
                        <S.ChangeAvatarInput onChange={uploadImage} id='change-avatar' type="file" />
                        <S.ChangeAvatarButton htmlFor="change-avatar"></S.ChangeAvatarButton>
                    </form>
                </S.SettingsBG>
             </div>
        </S.Wrapper>
    )
}

export default OpenSettings