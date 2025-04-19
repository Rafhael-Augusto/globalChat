import { useEffect, useState } from "react"

import TextModel from "../textModel/Model"

import * as S from './styles'

type InfoApi = {
  id: number,
  owner_id: number,
  text: string,
  attachment: File,
  avatar: string,
}

function App() {

  const [text, setText] = useState('')
  const [messages, setMessages] = useState<InfoApi[]>([])
  const [loaded, setLoaded] = useState(false)

  const CreateText = (e: React.FormEvent) => {
    e.preventDefault()

    if (text) {
        fetch('http://127.0.0.1:8000/api/messages/post/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            owner_id: 1
          })
        })
        .then((res) => res.json())
        .then((data) => {console.log('Mensagem enviada', data);
        ScrollToBottom()
        })
        .catch((err) => console.log('Erro ao enviar', err))

        setText('')
    }
  }

  const ScrollToBottom = () => {
    const container = document.getElementById('text-form')

        if (container) {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight
          }, 800)
        }
  }

    useEffect(() => {
      if (!loaded) {
        setLoaded(true)

        ScrollToBottom()
      }
    }, [loaded])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/messages/get/')
        const data = await res.json()
        setMessages(data)
      } catch (err) {
        console.error('erro ao buscar mensagems no banco de dados:', err)
      }
    }

    fetchMessages()

    const interval = setInterval(fetchMessages, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <S.Wrapper>
      <S.Title>Public Chat</S.Title>

      <S.Messages id="text-form">
      {messages.map((currentMessage) => (
            <div key={currentMessage.id}>
              <TextModel message={currentMessage.text} messageOwner={currentMessage.owner_id} avatar={currentMessage.avatar} />
            </div>
          ))}
      </S.Messages>

      <S.Form onSubmit={(e) => (CreateText(e))}>
        <S.AddDocumentButton htmlFor="add-file">+</S.AddDocumentButton>
        <S.AddDocument id="add-file" type="file" />
        <S.MessageBar maxLength={500} placeholder="Enter your message" value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <S.SendButton>Enviar</S.SendButton>
      </S.Form>
    </S.Wrapper>
  )
}

export default App
