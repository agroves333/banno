'use strict';

import React, { Component, PropTypes } from 'react'
import {Row, Col} from 'react-bootstrap';
import {get} from 'lodash';
import moment from 'moment';
import bold from 'utils/bold';

import styles from 'css/components/video-item';

const VideoItem = ({data, query, onClick, key}) => {
    const {title, videoId, description, thumbnailUrl, publishedAt} = data;

    return (
        <div className={styles.item}>
            <Row onClick={onClick(videoId)}>
                <Col xs={3}>
                    <img className={styles.thumbnail}
                         src={thumbnailUrl}
                         alt={key}
                    />
                </Col>
                <Col xs={9}>
                    <div className={styles.title}>
                       <a dangerouslySetInnerHTML={{__html: bold(query, title)}} />
                    </div>
                    <div className={styles.publishedAt}
                         dangerouslySetInnerHTML={{__html: moment(publishedAt).format('M/D/YYYY')}}>
                    </div>
                    <div className={styles.description}
                         dangerouslySetInnerHTML={{__html: bold(query, description)}}>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    query: PropTypes.string
};

VideoItem.defaultProps = {
    onClick: () => {}
};

export default VideoItem;
