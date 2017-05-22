import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import Save from 'components/Save';
import Remove from 'components/Remove';

import {get} from 'lodash';
import moment from 'moment';
import bold from 'utils/bold';

import styles from 'css/components/video-item';

const VideoItem = ({data, query, onClick, save, unsave, isSaved, hideSave, disableBold, isLoggedIn, isFavorite}) => {
    const {title, videoId, description, thumbnailUrl, publishedAt} = data;

    const handleSaveClick = event => {
        event.stopPropagation();
        isSaved ? unsave(videoId) : save(data);
    };

    const handleRemoveClick = event => {
        event.stopPropagation();
        unsave(videoId);
    };

    const renderSave = () => {
      return (
          <div className="col-xs-2">
            <Save
                isSaved={isSaved}
                onClick={handleSaveClick}
            />
          </div>
      )
    };

    const renderRemove = () => {
      return (
          <div className="col-xs-2">
            <Remove onClick={handleRemoveClick} />
          </div>
      )
    };

    return (
        <div className={styles.item}>
            <Row onClick={onClick(videoId)}>
                <Col xs={3}>
                    <img className={styles.thumbnail}
                         src={thumbnailUrl}
                    />
                </Col>
                <Col xs={hideSave ? 9 : 7}>
                    <div className={styles.title}>
                       <a dangerouslySetInnerHTML={{__html: disableBold ? title : bold(query, title)}} />
                    </div>
                    <div className={styles.publishedAt}
                         dangerouslySetInnerHTML={{__html: moment(publishedAt).format('M/D/YYYY')}}>
                    </div>
                    <div className={styles.description}
                         dangerouslySetInnerHTML={{__html: disableBold ? description : bold(query, description)}}>
                    </div>
                </Col>
                {!hideSave && isLoggedIn && renderSave()}
                {isFavorite && renderRemove()}
            </Row>
        </div>
    );
};

VideoItem.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    save: PropTypes.func,
    unsave: PropTypes.func,
    query: PropTypes.string,
    isSaved: PropTypes.bool,
    hideSave: PropTypes.bool,
    disableBold: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    isFavorite: PropTypes.bool
};

VideoItem.defaultProps = {
    onClick: () => {},
    disableBold: false
};

export default VideoItem;
