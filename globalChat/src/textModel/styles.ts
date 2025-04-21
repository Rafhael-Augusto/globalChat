import styled from "styled-components";

interface Owner {
    messageowner: number
    visibility: number
}

export const Wrapper = styled.div<Owner>`
    position: relative;
    cursor: pointer;

    &> h2 {
        text-align: ${(props) => props.messageowner !== 0 ? 'start' : 'end'};
        font-size: 12px;
        color: white;

        font-family: 'Inter', sans-serif;

        opacity: ${(props) => props.visibility === 1 ? 1: 0};
        transition: opacity 0.1s ease-in;

        margin-top:16px;
    }
    
    &> div {
    display: flex;
    word-break: break-all;

    max-width: 100%;

    flex-direction: ${(props) => props.messageowner !== 0  ? 'row-reverse' : 'row'};
    justify-content: ${(props) => props.messageowner !== 0 ? 'start' : 'end'};

    &> h1 {
        display: inline-block;
        font-size: 12px;

        background-color: ${(props) => props.messageowner === 0 ? '#284E91' : '#1B2532'};
        color: white;
        margin: 4px 0;
        padding: 8px 12px;

        border-radius: 4px;

        font-family: 'Inter', sans-serif;

        max-width: 70%;
    }

    &>img {
        display: inline-block;
        height: 32px;
        width: 32px;
        vertical-align: top;

        margin: 4px;
        border-radius: 50%;

        background-color: white;
    }

    opacity: ${(props) => props.visibility === 1 ? 1: 0};
        transition: opacity 0.1s ease-in;
    }
`

export const EditMessage = styled.div`
    height: 100%;
    width: 15%;
    background-color: rgba(0, 0, 0, 0.8);

    border-radius: 8px;
    margin-right: 8px;

    &> ul {
        text-align: center;
        margin: 4px 0;
        color: white;

        &> li {
            font-size: 14px;
            list-style-type: none;
            cursor: pointer;

            &:hover {
                color: gray;
            }
        }
    }
`