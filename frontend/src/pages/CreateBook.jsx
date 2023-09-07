import { useState } from 'react';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.post('http://localhost:4000/books', data).then(() => {
      setLoading(false);
      enqueueSnackbar('Book Create Success.', { variant: 'success' });
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('Book Create Error.', { variant: 'error' });
      console.log(error);
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 font-mono text-center font-bold text-yellow-600'>REGISTRAR LIBRO</h1>
      { loading ? <Spinner /> : '' }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Título</label>
          <input type="text" className='px-4 mt-2 rounded-xl text-black text-xl py-2 w-full' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Author</label>
          <input type="text" className='px-4 py-2 mt-2 rounded-xl text-black text-xl w-full' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className='my-2'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Publish Year</label>
          <input type="number" className='px-4 py-2 w-full mt-2 rounded-xl text-black text-xl' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
        </div>
        <button className='p-2 bg-green-700 m-6 rounded-lg font-bold hover:text-black hover:bg-green-500' onClick={handleSaveBook}>REGISTRAR</button>
      </div>
    </div>
  )
}

export default CreateBook;