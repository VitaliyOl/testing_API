import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImages } from './services/fetchApi';
import Loader from './Loader/Loader';

import React, { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,

    isLoading: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      try {
        this.setState({ isLoading: true });
        const images = await GetImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, images],
        }));
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      }
    }
  }

  getQuery = ({ query }) => {
    this.setState({ query, images: [], page: 1 });
  };

  render() {
    const { isLoader, images } = this.state;
    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.getQuery} />
        <ImageGallery items={images} />

        {isLoader && <Loader />}
        <ToastContainer />
      </Container>
    );
  }
}
