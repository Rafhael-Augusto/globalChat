import styled from "styled-components";

interface Owner {
    messageowner: number
}

export const Wrapper = styled.div<Owner>`
    display: flex;
    word-break: break-all;

    max-width: 100%;

    flex-direction: ${(props) => props.messageowner === 1 ? 'row' : 'row-reverse'};
    justify-content: ${(props) => props.messageowner === 1 ? 'end' : 'start'};


    &> h1 {
        display: inline-block;
        font-size: 12px;
        background-color: ${(props) => props.messageowner === 1 ? '#1B2532' : '#284E91'};
        color: white;
        margin: 4px 0;
        padding: 8px 12px;

        border-radius: 4px;

        max-width: 70%;
    }

    &>img {
        display: inline-block;
        height: 32px;
        width: 32px;
        vertical-align: top;

        margin: 4px;
        border-radius: 50%;
    }
`