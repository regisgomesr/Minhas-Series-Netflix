import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Generos = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => {
            setData(res.data.data)
        })
    }, [])

    const deleteGenero = id => {
        //console.log(id)
        axios.delete('/api/genres/' + id)
        .then(res => {
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
        })
    }

    const renderizaLinha = registro => {
        return(
        <tr key={registro.id}>
            <th scope='row'>{registro.id}</th>
            <td>{registro.name}</td>
            <td>
                <Link to={'/generos/' + registro.id} className="btn btn-warning">Editar</Link>
                <button className="btn btn-danger" onClick={() => deleteGenero(registro.id)}>Remover</button>
            </td>
        </tr>
        )
    }

    if(data.length === 0) {
        return(
            <div className='container'>
                <h1>Genêros</h1>
                <div className='alert alert-warning' role='alert'>
                    Não Existe Generos!
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Genêros</h1>
            <Link to='/generos/novo' className="btn btn-success">Novo Genêro</Link>
            
            <table className='table table-dark'>
                <thead>
                    <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    ) 
  }

  export default Generos