import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')
    const [genres, setGenres] = useState([])

    const [data, setData] = useState({})
    useEffect(() => {
        axios
        .get('/api/series/' + match.params.id)
        .then(res => {
            setData(res.data)
            setForm(res.data)
        })
    })

    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
        })
    })

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    // Função que chama outra função passando para o field qual é o campo em questao
    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }


    const save = () => {
        axios
        .post('/api/series', {
            form
        })
        .then(res => {
            //console.log(res)
            setSuccess(true)
        })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return(

        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }} >

                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para assitir</Badge>
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <div>
                <button onClick={() => setMode('EDIT')} className="btn btn-success">Editar</button>
            </div>

            {
                mode === 'EDIT' &&

            <div className='container'>
                <h1>Info Série</h1>
                <pre>{JSON.stringify(form)}</pre>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Editar Série' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='name'>Comentários</label>
                        <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Editar Comentário' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='name'>Gêneros</label>
                        <select className="form-control">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    <button onClick={() => setMode('INFO')} className="btn btn-danger">Cancelar</button>
                </form>

            </div>

            }

        </div>

    )
}

export default InfoSerie