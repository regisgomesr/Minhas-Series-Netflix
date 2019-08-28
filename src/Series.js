import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Series = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
        .get('/api/series')
        .then(res => {
            setData(res.data.data)
        })
    }, [])

    const deleteSerie = id => {
        //console.log(id)
        axios.delete('/api/series/' + id)
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
                <Link to={'/series/' + registro.id} className="btn btn-warning">Info</Link>
                <button className="btn btn-danger" onClick={() => deleteSerie(registro.id)}>Remover</button>
            </td>
        </tr>
        )
    }

    if(data.length === 0) {
        return(
            <div className='container'>
                <h1>Séries</h1>
                    <Link to='/series/novo' className="btn btn-success">Nova Série</Link>
                <div className='alert alert-warning' role='alert'>
                    Não Existe Séries!
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries</h1>
            <Link to='/series/novo' className="btn btn-success">Nova Série</Link>
            
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

  export default Series