import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home() {
  const clientes = [
    new Cliente ('Ana', 34, '1'),
    new Cliente ('Juca', 45, '2'),
    new Cliente ('Joao', 32, '3'),
  ]

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
     <Layout titulo="Cadastro Simples">
       <Tabela clientes={clientes}/>
     </Layout>
    </div>
  )
}
