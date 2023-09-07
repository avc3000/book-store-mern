import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

const BookModal = ({ book, index, onClose }) => {
  return (
    <div onClick={onClose} className='fixed bg-slate-600 bg-opacity-50 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
      <div onClick={(e) => e.stopPropagation()} className='w-[600px] max-w-full h-[400px] bg-black rounded-xl p-4 flex flex-col relative'>
        <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer' onClick={onClose} />
        <h2 className='w-fit px-4 py-1 bg-red-400 rounded-lg'>{book.publishYear}</h2>
        <h4 className='my-2 text-gray-500 text-xl'>{index}</h4>
        <div className='flex justify-start items-center gap-x-2'>
          <PiBookOpenTextLight className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.title}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <BiUserCircle className='text-red-300 text-2xl' />
          <h2 className='my-1'>{book.author}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
          <p className='text-xl mt-2 border-2 border-sky-700 rounded-3xl text-justify py-2 px-3'>
            Uno de los mejores libros de la historia y los más leidos. Fue traducida en más de 100 idiomas.
            El mejor amigo que un ser humano puede tener es definitivamente este libro, lleno de conocimiento
            y de mundos por descubrir gracias al autor. Y recuerda un libro es un regalo para toda la vida. <br /><br />
            <span className='font-bold text-slate-400'>{`"${book.author}"`}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

BookModal.propTypes = {
  book: PropTypes.object,
  index: PropTypes.number,
  onClose: PropTypes.func
};

export default BookModal;