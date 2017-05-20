import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import Save from 'components/Save';

import {get} from 'lodash';
import moment from 'moment';
import bold from 'utils/bold';

import styles from 'css/components/video-item';

const VideoItem = ({data, query, onClick, save, unsave}) => {
    const {title, videoId, description, thumbnailUrl, publishedAt} = data;

    return (
        <div className={styles.item}>
            <Row onClick={onClick(videoId)}>
                <div className="col-xs-3">
                    <img className={styles.thumbnail}
                         src={thumbnailUrl}
                    />
                </div>
                <div className="col-xs-8">
                    <div className={styles.title}>
                       <a dangerouslySetInnerHTML={{__html: bold(query, title)}} />
                    </div>
                    <div className={styles.publishedAt}
                         dangerouslySetInnerHTML={{__html: moment(publishedAt).format('M/D/YYYY')}}>
                    </div>
                    <div className={styles.description}
                         dangerouslySetInnerHTML={{__html: bold(query, description)}}>
                    </div>
                </div>
                <div className="col-xs-1">
                  <Save
                      data={data}
                      save={save}
                      unsave={unsave}/>
                </div>
            </Row>
        </div>
    );
};

VideoItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    save: PropTypes.func,
    unsave: PropTypes.func,
    query: PropTypes.string
};

VideoItem.defaultProps = {
    onClick: () => {},
};

export default VideoItem;
