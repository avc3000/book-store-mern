import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiShow, BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import BookModal from './BookModal';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

const BookCard = ({ book, index }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`http://localhost:4000/books/${id}`).then(() => {
        window.location.reload();
        enqueueSnackbar('Book Delete Success.', { variant: 'success' });
      }).catch((error) => {
        enqueueSnackbar('Book Delete Error.', { variant: 'error' });
        console.log(error);
      });
    }
    else
      navigate('/');
  };

  return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-400 rounded-lg'>{book.publishYear}</h2>
      <h4 className='my-2 text-gray-500'>{index + 1}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.title}</h2>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <BiUserCircle className='text-red-300 text-2xl' />
        <h2 className='my-1'>{book.author}</h2>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow className='text-3xl text-blue-800 hover:text-blue-600 cursor-pointer' onClick={() => setShowModal(true)} />
        <Link to={`/books/details/${book._id}/${index + 1}`}><BsInfoCircle className='text-2xl text-green-800 hover:text-green-600' /></Link>
        <Link to={`/books/edit/${book._id}`}><AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-400' /></Link>
        <button onClick={() => handleDeleteBook(book._id)}><MdOutlineDelete className='text-2xl text-red-600 hover:text-red-500' /></button>
      </div>
      {
        showModal && (<BookModal book={book} index={index + 1} onClose={() => setShowModal(false)} />)
      }
    </div>
  )
}

BookCard.propTypes = {
  book: PropTypes.object,
  index: PropTypes.number,
};

export default BookCard;