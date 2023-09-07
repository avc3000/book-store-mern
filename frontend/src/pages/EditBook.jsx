import { useEffect, useState } from 'react';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/books/${id}`).then((response) => {
      setLoading(false);
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('Book Data Error.', { variant: 'error' });
      console.log(error);
    });
  }, [id, enqueueSnackbar])
  
  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.put(`http://localhost:4000/books/${id}`, data).then(() => {
      setLoading(false);
      navigate('/');
      enqueueSnackbar('Book Edit Success.', { variant: 'success' });
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('Book Edit Error.', { variant: 'error' });
      console.log(error);
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center font-bold font-mono text-yellow-600'>EDITAR LIBRO</h1>
      { loading ? <Spinner /> : '' }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Título</label>
          <input type="text" className='mt-2 rounded-xl text-black px-4 py-2 w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Autor</label>
          <input type="text" className='mt-2 rounded-xl text-black px-4 py-2 w-full' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Año Publicación</label>
          <input type="number" className='mt-2 rounded-xl text-black px-4 py-2 w-full' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        </div>
        <button className='p-2 bg-blue-800 m-6 font-bold rounded-xl hover:text-black hover:bg-blue-600' onClick={handleEditBook}>ACTUALIZAR</button>
      </div>
    </div>
  )
}

export default EditBook;