import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { getSearchImages } from '../api/Api';
import Notiflix from 'notiflix';

const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    const handleProducts = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits, perPage } = await getSearchImages(query, page);

        if (hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
        } else if (totalHits < page * perPage && totalHits !== 0) {
          delayNotify();
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      handleProducts();
    }
  }, [query, page]);

  const delayNotify = () => {
    setTimeout(() => {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }, 1000);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar submit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loadMore && <Button handleLoad={loadMoreImages} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
