import './style.css'
import { useEffect, useState, useRef } from 'react'
import Lixeira from '../formulario/excluir.png'
import api from '../../services/api'

function Formulario() {
  //useEffect serve para quando iniciar a pagina sempre carregar a seguintes função
  useEffect(() => {
    pegarUsuario()
  }, [])

  //useState serve para fazer uma variavel quando mudar o seu valor aparcer na tela
  const [users, setUsers] = useState([])

  //useRef serve para pegar o falor que ta no input, obs: la no input tem que colocar a referencia
  const inputNome = useRef()
  const inputAno = useRef()
  const inputEmail = useRef()

  async function pegarUsuario() {
    const usersFromApi = await api.get('/usuario')
    setUsers(usersFromApi.data)
  }

  async function criarUsuario() {
    await api.post('/usuario', {
      nome: inputNome.current.value,
      ano: inputAno.current.value,
      email: inputEmail.current.value
    })
    pegarUsuario()
  }

  async function deletarUsuario(id) {
    await api.delete(`/usuario/${id}`)
    pegarUsuario()
  }

  return (

    <div className='conteiner'>
      <div className='conteudo'>
        <form action="">
          <input id='nome' type="text" placeholder='Nome' ref={inputNome} />
          <input id='idade' type="number" placeholder='Ano' ref={inputAno} />
          <input id='email' type="text" placeholder='E-mail' ref={inputEmail} />
          <button type="button" onClick={criarUsuario}>Enviar</button>
        </form>
      </div>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.nome}</p>
            <p>Idade: {user.ano}</p>
            <p>E-mail: {user.email}</p>
          </div>
          <button onClick={() => deletarUsuario(user.id)}><img src={Lixeira} /></button>
        </div>
      ))}
    </div>
  )
}
export default Formulario