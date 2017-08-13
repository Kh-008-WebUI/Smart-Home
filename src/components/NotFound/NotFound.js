import React from 'react';
import Header from '../../components/Auth/Header/Header';

export const NotFound = (props) => {
  return (
    <div className="not-found">
      <Header
        pic={'fa-times-circle-o'}
        title={'404'}
        text={'Page Not Found'}/>
      <div className="not-found__info">
        Sorry, but the page you are looking for has note been found.
        Try checking the URL for error, then hit the refresh button
        on your browser or try found something else in our app.
      </div>
    </div>
  );
};
