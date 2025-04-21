import { useEffect, useRef, useState } from "react"

import { useNavigate } from "react-router-dom"

import TextModel from "../textModel/Model"

import * as S from './styles'

type InfoApi = {
  id: number,
  owner: number,
  text: string,
  attachment: File,
  avatar: string,
  owner_username: string
}

function App() {

  const navigate = useNavigate()

  const [text, setText] = useState('')
  const [messages, setMessages] = useState<InfoApi[]>([])
  const [loaded, setLoaded] = useState(false)

  const [id, setId] = useState(0)

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
            owner_id: id,
          })
        })
        .then((res) => res.json())
        .then((data) => {console.log('Mensagem enviada', data);
        })
        .catch((err) => console.log('Erro ao enviar', err))

        setText('')
    }
  }

  const ScrollToBottom = () => {
    const container = document.getElementById('text-form')

        if (container) {
          container.scrollTop = container.scrollHeight
        }
  }

    useEffect(() => {
      if (!loaded) {
        setLoaded(true)

        const token = localStorage.getItem('access_token')
        const fetchInfo = async () => {
          try {
            const res = await fetch('http://127.0.0.1:8000/api/user-info/', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })

            if (!res.ok) throw new Error('Erro na resposta da api o meu Deus do CEU')

            const data = await res.json()
            
            setId(data.id)
          } catch (err) {
            console.error('erro ao buscar dados do usuario', err)
            navigate('/chat')
          }
        }

        fetchInfo()
      }
    }, [loaded, navigate])

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

  const prevLength = useRef(0)

  useEffect(() => {
    if (messages.length > prevLength.current) {
      ScrollToBottom()
    }

    prevLength.current = messages.length
  }, [messages])

  return (
    <S.Wrapper>
      <S.Title>Public Chat</S.Title>

      <S.Messages id="text-form">
      {messages.map((currentMessage) => {
        return (
          (
            <div key={currentMessage.id}>
              <TextModel message={currentMessage.text} ownername={currentMessage.owner_username} messageOwner={currentMessage.owner}/>
            </div>
          ))}
        )
      }
      </S.Messages>

      <S.Form onSubmit={(e) => (CreateText(e))}>
        <S.MessageBar maxLength={500} placeholder="Enter your message" value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <S.SendButton>Enviar</S.SendButton>
      </S.Form>
    </S.Wrapper>
  )
}

export default App
