import styled from "styled-components";

export const Messages = styled.div`
    background-color: #0C1119;
    overflow-y: scroll;

    max-width: 400px;
    height: 400px;
    width: 100%;
    scrollbar-color: #000 transparent;
    scrollbar-width: thin;
    scroll-behavior: smooth;

    padding: 8px;
`

export const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    background-color: #0B1119;
    height: 64px;
    width: 400px;

    border-bottom: 2px solid #171C25;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #171C25;

    height: 100vh;

    * {
        font-family: 'Inter', sans-serif;
    }
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    background-color: #0B1119;
    height: 64px;
    width: 400px;

    border-top: 2px solid #171C25;
`

export const SendButton = styled.button`
    background-color: #284E91;
    color: white;

    border: none;
    border-radius: 4px;
    height: 40px;
    width: 64px;

    cursor: pointer;
`

export const MessageBar = styled.input`
    background-color: #0C1119;
    color: white;

    font-size: 16px;

    height: 40px;
    width: 70%;

    border: 2px solid #171C25;
    border-radius: 8px;

    padding: 8px;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
    }
`

export const AddDocument = styled.input`
    display: none;
`

export const AddDocumentButton = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #171C25;

    font-family: sans-serif;

    border-radius: 50%;
    
    color: white;
    font-size: 32px;
    height: 32px;
    width: 32px;

    cursor: pointer;
`