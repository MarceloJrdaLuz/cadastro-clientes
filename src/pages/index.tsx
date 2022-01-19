import { useEffect, useState } from "react";
import ColecaoCLiente from "../backend/db/ColecaoCliente";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import ClienteRepositorio from "../core/ClienteRepositorio";

export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCLiente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos,[])

  // const clientes = [
  //   new Cliente('Ana', 34, '1'),
  //   new Cliente('Juca', 45, '2'),
  //   new Cliente('Joao', 32, '3'),
  // ]



  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  function obterTodos(){
    repo.obterTodos().then(clientes  => {
      setClientes(clientes)
      setVisivel('tabela')
    } )
  }

  function novoCliente(){
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  async function salvarCliente (cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao cor='red' className='mb-4' onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido} />
          </>
        ) : (

          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
          />
        )}
      </Layout>
    </div>
  )
}
