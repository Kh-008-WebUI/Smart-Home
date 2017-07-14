import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';

const Avatar = (props) => {
  return (
    <figure className="person-view">
      <div className="person-avatar-and-name">
        <div className="avatar-image"></div>
        <figurecaption>{props.item.name}</figurecaption>
      </div>
      <div className='person-at-home'>
        <i
          className={
            'fa fa-home person-at-home' + (props.item.home ? '' : '__false')}
          aria-hidden="true">
        </i>
      </div>
    </figure>
  );
};

Avatar.propTypes = {
  item: PropTypes.object,
  home: PropTypes.bool
};

export default Avatar;
