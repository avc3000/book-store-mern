import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from './../components/BackButton';
import Spinner from './../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id, index } = useParams();
  const yearCreate = new Date(book.createdAt).getFullYear().toString();
  const monthCreate = new Date(book.createdAt).getMonth().toString();
  const dayCreate = new Date(book.createdAt).getDay().toString();
  const yearUpdate = new Date(book.updatedAt).getFullYear().toString();
  const monthUpdate = new Date(book.updatedAt).getMonth().toString();
  const dayUpdate = new Date(book.updatedAt).getDay().toString();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/books/${id}`).then((response) => {
      setBook(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, [id]);
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 font-bold text-center text-green-600 font-mono'>DETALLE DEL LIBRO</h1>
      {
        loading ? (<Spinner />) : (
          <div className='flex justify-center'>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-1/3 p-4'>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Número: </span>
                <span className='font-bold text-lg font-mono'>{index}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Titulo: </span>
                <span className='font-bold text-lg font-mono'>{book.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Autor: </span>
                <span className='font-bold text-lg font-mono'>{book.author}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Año de Publicación: </span>
                <span className='font-bold text-lg font-mono'>{book.publishYear}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Fecha de Creación: </span>
                <span className='font-bold text-lg font-mono'>{dayCreate + '/' + monthCreate + '/' + yearCreate}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Fecha de Actualización: </span>
                <span className='font-bold text-lg font-mono'>{dayUpdate + '/' + monthUpdate + '/' + yearUpdate}</span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ShowBook;