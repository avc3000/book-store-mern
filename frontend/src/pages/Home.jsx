import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from './../components/home/BooksCard';
import BooksTable from './../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/books').then((response) => {
      setBooks(response.data.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);
  
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-900 hover:bg-sky-700 hover:text-black px-4 py-2 rounded-lg font-bold' onClick={() => setShowType('table')}>TABLA</button>
        <button className='bg-sky-900 hover:bg-sky-700 hover:text-black px-4 py-2 rounded-lg font-bold' onClick={() => setShowType('card')}>CARD</button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-4 font-mono font-bold text-orange-500'>LISTA DE LIBROS:</h1>
        <Link to='/books/create'><MdOutlineAddBox className='text-sky-800 text-4xl' /></Link>
      </div>
      {
        loading ? (<Spinner />) : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)
      }
    </div>
  )
}

export default Home;