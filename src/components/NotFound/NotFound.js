import React from 'react';
import { Header } from '../../components/Auth/Header/Header';
import './NotFound.scss';

const NotFound = (props) => {
  return (
    <div className="not-found">
      <Header
        pic={'fa-times-circle-o'}
        title={'404'}
        text={'Page Not Found'}/>
      <div className="not-found__info">
        Sorry, but the page you are looking for is not found.
        Try checking the URL, then hit the refresh button
        on your browser or try found something else in our app.
      </div>
    </div>
  );
};

export default NotFound;