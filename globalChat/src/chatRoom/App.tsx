import { useEffect, useState } from "react"

import TextModel from "../textModel/Model"

import * as S from './styles'

function App() {
  const ApiHardcodded = [
    {
      id: 1,
      message: 'Mensagem salva na API :)',
      messageOwnerId: 1,
      documentAttached: ''
    },
    {
      id: 2,
      message: 'Mensagem de alguem vinda da API :)',
      messageOwnerId: 2,
      documentAttached: ''
    },
    {
      id: 3,
      message: 'Resposta:)',
      messageOwnerId: 1,
      documentAttached: ''
    },
    {
      id: 4,
      message: 'Mensagem de alguem vinawdwa2qda da API :)',
      messageOwnerId: 2,
      documentAttached: ''
    },
  ]

  const [text, setText] = useState('')
  const [fullText, setFullText] = useState<string[]>([])

  const CreateText = (e: React.FormEvent) => {
    e.preventDefault()

    if (text) {
        setFullText([...fullText, text])
        setText('')
    }
  }

  useEffect(() => {
    const container = document.getElementById('text-form')

    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [fullText])

  return (
    <S.Wrapper>
      <S.Title>Public Chat</S.Title>

      <S.Messages id="text-form">
      {ApiHardcodded.map((fullMessage) => (
            <div key={fullMessage.id}>
              <TextModel message={fullMessage.message} messageOwner={fullMessage.messageOwnerId} />
            </div>
          ))}
      </S.Messages>

      <S.Form onSubmit={(e) => (CreateText(e))}>
        <S.AddDocumentButton htmlFor="add-file">+</S.AddDocumentButton>
        <S.AddDocument id="add-file" type="file" />
        <S.MessageBar placeholder="Enter your message" value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <S.SendButton>Enviar</S.SendButton>
      </S.Form>
    </S.Wrapper>
  )
}

export default App
