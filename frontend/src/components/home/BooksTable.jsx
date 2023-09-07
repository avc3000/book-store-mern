import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

const BooksTable = ({ books }) => {
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
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md bg-slate-700 text-green-600'>Nro</th>
          <th className='border border-slate-600 rounded-md bg-slate-700 text-green-600'>Titulo</th>
          <th className='border border-slate-600 rounded-md bg-slate-700 text-green-600 max-md:hidden'>Autor</th>
          <th className='border border-slate-600 rounded-md bg-slate-700 text-green-600 max-md:hidden'>Año Publicación</th>
          <th className='border border-slate-600 rounded-md bg-slate-700 text-green-600'>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        {
          books.map((book, index) => (
            <tr key={book._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>
                {index + 1}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>
                {book.title}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {book.author}
              </td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                {book.publishYear}
              </td>
              <td className='border border-slate-700 rounded-md text-center'>                      
                <div className='flex justify-center gap-x-4'>
                  <Link to={`/books/details/${book._id}/${index + 1}`}><BsInfoCircle className='text-2xl text-green-800' /></Link>
                  <Link to={`/books/edit/${book._id}`}><AiOutlineEdit className='text-2xl text-yellow-600' /></Link>
                  <button onClick={() => handleDeleteBook(book._id)}><MdOutlineDelete className='text-2xl text-red-800' /></button>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

BooksTable.propTypes = {
  books: PropTypes.array,
};

export default BooksTable;