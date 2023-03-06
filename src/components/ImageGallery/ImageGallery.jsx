import css from './imageGallery.module.css';
import { useState, useEffect } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { SearchLoad } from './SearchLoad/SearchLoad';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { getPhotos } from 'api/api';

import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

export const ImageGallery = ({ imageName }) => {
  // const [state, setState] = useState(...initialState);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [photos, setPhotos] = useState([]);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  // const reset = () => {
  //   setPage({ page: 1 });
  //   setTotalHits({ totalHits: null });
  //   setPhotos({ photos: [] });
  //   setModalOpen({ modalOpen: false });
  // };

  const getImage = imageURL => {
    setModalImage(imageURL);
  };

  // const totalPages = Math.ceil(state.totalHits / 12);

  useEffect(() => {
    setQuery(imageName);
    setPage(1);
    setPhotos([]);
  }, [imageName]);

  useEffect(() => {
    const fetchImage = async () => {
      if (query === '' || imageName === '') {
        return;
      }
      setLoading(true);
      // reset();
      // setLoading(!loading);
      try {
        // setStatus('pending');
        // setLoading(true);
        const newPhotos = await getPhotos(query, page);
        // setLoading(!loading);
        // setLoading(actual => !actual);
        if (newPhotos.totalHits === 0 || newPhotos.totalHits === null) {
          setLoading(false);
          setLoading(!loading);
          return;
        }

        setStatus('resolved');
        // setLoading(false);
        // setLoading(!loading);
        setTotalHits({ totalHits: newPhotos.totalHits });
        setPhotos(prev => [...prev, ...newPhotos.hits]);

        if (page !== 1) {
          scroll.scrollToBottom();
        }
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      } finally {
        // setLoading(!loading);
        setLoading(false);
      }
    };
    if (query) {
      fetchImage();
    }
  }, [page, query]);

  if (status === 'idle') {
    return (
      <p className={css.idleText}>
        Please enter what would you like to see! 🌞
      </p>
    );
  }

  // if (status === 'pending') {
  //   return <Loader />;
  // }

  if (photos.length > 0) {
    return (
      <>
        <ul className={css.gallery}>
          {photos.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                getImage={getImage}
              />
            );
          })}
        </ul>
        {/* {loading && <Wrap />} */}
        {/* {photos.length > 11 && (
          <SearchLoad loadMore={loadMore} text="Load more" />
        )} */}
        {photos.length > 11 && (
          <SearchLoad loadMore={loadMore} text="Load more" />
        )}
        {loading && <Loader />}
        {modalImage !== null && (
          <Modal
            image={modalImage}
            toggleModal={toggleModal}
            closeModal={closeModal}
          />
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <p className={css.idleText}>
        Sorry, there is something wrong here... Please try again!
      </p>
    );
  }
};

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  id: PropTypes.number,
  closeModal: PropTypes.func,
  toggleModal: PropTypes.func,
};

// export class ImageGallery extends Component {
//   state = {
//     page: 1,
//     totalPages: 0,
//     totalHits: null,
//     photos: [],
//     error: null,
//     status: 'idle',
//     modalOpen: false,
//     modalImage: null,
//   };

//   static propTypes = {
//     imageName: PropTypes.string.isRequired,
//     id: PropTypes.number,
//     closeModal: PropTypes.func,
//     toggleModal: PropTypes.func,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.imageName;
//     const newName = this.props.imageName;
//     const prevPage = prevState.page;
//     const newPage = this.state.page;

//     if (prevName !== newName) {
//       this.reset();
//       this.setState({
//         status: 'pending',
//       });
//     }

//     if ((newName && prevName !== newName) || prevPage < newPage) {
//       try {
//         const newPhotos = await getPhotos(newName, newPage);
//         if (newPhotos.totalHits === 0 || newPhotos.totalHits === null) {
//           return this.setState({ status: 'rejected' });
//         }
//         const totalPages = Math.ceil(newPhotos.totalHits / 12);
//         this.setState(
//           prevState => ({
//             status: 'resolved',
//             totalHits: newPhotos.totalHits,
//             photos: [...prevState.photos, ...newPhotos.hits],
//             totalPages: totalPages,
//           }),
//           () => {
//             smoothScroll();
//           }
//         );
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }
//   }

//   loadMore = () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//   };

//   toggleModal = () => {
//     this.setState({ modalOpen: !this.state.modalOpen });
//   };

//   closeModal = () => {
//     this.setState({ modalOpen: false, modalImage: null });
//   };

//   reset = () => {
//     this.setState({
//       page: 1,
//       totalHits: null,
//       photos: [],
//       modalOpen: false,
//     });
//   };

//   getImage = imageURL => {
//     this.setState({
//       modalImage: imageURL,
//     });
//     this.toggleModal();
//   };

//   render() {
//     const { status, photos, modalImage, page, totalPages } = this.state;
//     const { loadMore, newPage, prevPage, toggleModal, getImage } = this;

//     if (status === 'idle') {
//       return (
//         <p className={css.idleText}>
//           Please enter what would you like to see! 🌞
//         </p>
//       );
//     }

//     if (status === 'pending' || newPage !== prevPage) {
//       return <Wrap />;
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <ul className={css.gallery}>
//             {photos.map(({ id, webformatURL, largeImageURL }) => {
//               return (
//                 <ImageGalleryItem
//                   key={id}
//                   largeImageURL={largeImageURL}
//                   webformatURL={webformatURL}
//                   getImage={getImage}
//                 />
//               );
//             })}
//           </ul>
//           {totalPages > page && (
//             <SearchLoad loadMore={loadMore} text="Load more" />
//           )}
//           {modalImage !== null && (
//             <Modal
//               image={modalImage}
//               toggleModal={toggleModal}
//               closeModal={this.closeModal}
//             />
//           )}
//         </>
//       );
//     }

//     if (status === 'rejected') {
//       return (
//         <p className={css.idleText}>
//           Sorry, there is something wrong here... Please try again!
//         </p>
//       );
//     }
//   }
// }
