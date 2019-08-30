import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [success, setSuccess] = useState(false)
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')
    const [data, setData] = useState({})

    useEffect(() => {
        axios
        .get('/api/series/')
        .then(res => {
            setData(res.data)
        })
    }, [])

    useEffect(() => {
        axios
        .get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
            const genres = res.data.data
            const encontrado = genres.find(value => data.genre === value.name)
            //console.log('Encontrado', encontrado)
            if(encontrado) {
                setGenreId(encontrado.id)
            }
        })
    }, [data])

    const onChange = evt => {
        setName(evt.target.value)
    }

    const onChangeStatus = evt => {
        setStatus(evt.target.value)
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const save = () => {
        axios.post('/api/series', {
            //name: name
            name,
            genre_id: genreId,
            status
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
        <div className='container'>
            <h1>Nova Série</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Digite nova Série' />
                </div>

                <div className='form-group'>
                        <label htmlFor='name'>Gênero</label>
                        <select className='form-control' onChange={onChangeGenre} value={genreId}>
                            {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
                        </select>
                </div>

                <div className='form-check'>
                        <input className='form-check-input' type='radio' checked name='status' id='assistido' value='ASSISTIDO' onChange={onChangeStatus} />
                        <label className='form-check-label' htmlFor='assistido'>
                            Assistido
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={onChangeStatus} />
                        <label className='form-check-label' htmlFor='paraAssistir'>
                            Para Assistir
                        </label>
                    </div>

                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            </form>

        </div>
    )
}

export default NovaSerie