import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { getSearchImages } from '../api/Api';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    query: '',
    isLoading: false,
    error: '',
    images: [],
    page: 1,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.handleProducts();
    }
  }

  handleProducts = async () => {
    try {
      const { query, page } = this.state;

      this.setState({ isLoading: true });
      const { hits, totalHits, perPage } = await getSearchImages(query, page);

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
      } else if (totalHits < page * perPage && totalHits !== 0) {
        this.delayNotify();
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / perPage),
      }));
    } catch (error) {
      Notiflix.Notify.failure(error.message);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  delayNotify = () => {
    setTimeout(() => {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }, 1000);
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = ({ query }) => {
    this.setState({ query, images: [], page: 1, loadMore: false });
  };

  render() {
    const { images, isLoading, loadMore } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar submit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loadMore && <Button handleLoad={this.loadMoreImages} />}
        {isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
