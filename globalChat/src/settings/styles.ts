import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #171C25;

    height: 100vh;


    * {
        font-family: 'Inter', sans-serif;
        text-align: center;
        color: white;
    }

    h1 {
        background-color: #0C1119;

        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

        border-bottom: 2px solid #171C25;

        padding: 8px;
    }
`

export const SettingsBG = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    
    background-color: #0C1119;

    height: 240px;
    width: 240px;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    &>h2 {
        margin-top: 16px;
    }
`

export const ChangeAvatarInput = styled.input`
    display: none;
`

export const ChangeAvatarButton = styled.label`
    display: block;
    border-radius: 8px;

    background-image: url('https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder.png?ssl=1');
    background-size: cover;

    height: 64px;
    width: 64px;

    cursor: pointer;
`