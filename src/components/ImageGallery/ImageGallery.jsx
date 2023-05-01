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
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // const firstRender = useRef(true);
  // const prevPage = useRef(1);
  // const prevSearch = useRef('');

  useEffect(() => {
    setQuery(imageName);
    setPage(1);
    setPhotos([]);
  }, [imageName, query]);

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

  const getImage = imageURL => {
    setModalImage(imageURL);
  };

  // useEffect(() => {
  //   prevPage.current = page;
  //   prevSearch.current = imageName;
  // });

  // useEffect(() => {
  //   // if (firstRender.current) {
  //   //   firstRender.current = false;
  //   //   return;
  //   // }

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImage = async () => {
      setLoading(true);
      try {
        setStatus('pending');
        const newPhotos = await getPhotos(query, page);
        if (newPhotos.totalHits === 0 || newPhotos.totalHits === null) {
          setLoading(false);
          return;
        }
        setStatus('resolved');
        setTotalHits({ totalHits: newPhotos.totalHits });
        setPhotos(prev => [...prev, ...newPhotos.hits]);
        if (page !== 1) {
          scroll.scrollToBottom();
        }
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      } finally {
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

  if (photos.length > 0 || totalHits > 0) {
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
