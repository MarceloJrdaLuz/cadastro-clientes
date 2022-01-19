import { useEffect, useState } from "react"
import ColecaoCLiente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCLiente()

    const{
        tabelaVisivel,
        exibirFormulario,
        exibirTabela,
      } = useTabelaOuForm()
    

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

    const [clientes, setClientes] = useState<Cliente[]>([])

    useEffect(obterTodos, [])

    function selecionarCliente(cliente: Cliente) {
        setCliente(cliente)
        exibirFormulario()
    }

    async function  excluirCliente(cliente: Cliente) {
        await repo.excluir(cliente)
        obterTodos()
    }

    function obterTodos() {
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }

    function novoCliente() {
        setCliente(Cliente.vazio())
        exibirFormulario()
    }

    async function salvarCliente(cliente: Cliente) {
        await repo.salvar(cliente)
        obterTodos()
    }

    return{
        novoCliente,
        excluirCliente,
        salvarCliente,
        selecionarCliente,
        obterTodos,
        cliente,
        clientes,
        tabelaVisivel,
        exibirTabela,
    }
}