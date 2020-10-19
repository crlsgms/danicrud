import Axios from 'axios'
import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'camera-retro',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/products'
const initialState = {
    user: { description: '', price: '', qty: '' },
    list: []
}

export default class ProductCrud extends Component{
 
    state = { ...initialState}

    componentWillMount() {
        // consome a API com GET (por padrao)
        // altera a variavel list com os dados da resposta do GET
        // trazendo todos os produtos
        Axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    renderForm(){

    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(product)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
    
}