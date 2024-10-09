import './style.css';
import { useEffect, useState, useRef } from 'react';
import Lixeira from '../formulario/excluir.png';
import api from '../../services/api';

function Formulario() {
  useEffect(() => {
    pegarUsuario();
  }, []);

  const [users, setUsers] = useState([]);
  const inputNome = useRef();
  const inputAno = useRef();
  const inputEmail = useRef();

  async function pegarUsuario() {
    const usersFromApi = await api.get('/usuario');
    setUsers(usersFromApi.data);
  }

  async function criarUsuario() {
    await api.post('/usuario', {
      nome: inputNome.current.value,
      ano: inputAno.current.value,
      email: inputEmail.current.value,
    });
    pegarUsuario();
  }

  async function deletarUsuario(id) {
    await api.delete(`/usuario/${id}`);
    pegarUsuario();
  }

  return (
    <div className='conteiner'>
      <h1>Lista de Usuários</h1> {/* Adicionado título aqui */}
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
          <button onClick={() => deletarUsuario(user.id)}>
            <img src={Lixeira} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Formulario;
