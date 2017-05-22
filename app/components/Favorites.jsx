import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    Row,
    Col,
} from 'react-bootstrap';

import VideoItem from 'components/VideoItem';
import Modal from 'components/Modal';

// Utils
import {get, has} from 'lodash';
import classnames from 'classnames';

// Styles
import styles from 'css/components/favorites';

class Favorites extends Component {

  constructor() {
    super();

    this.state = {
      videoUrl: '',
      videoTitle: '',
      videoId: '',
      showVideoModal: false,
    };
  }

  getYoutubeUrl(id) {
    return `//www.youtube.com/embed/${id}?&autoplay=1&rel=0`;
  }

  handleCloseVideoModal() {
    this.setState({showVideoModal: false});
  }

  handleOpenVideoModal(data) {
    this.setState({
      showVideoModal: true,
      videoTitle: data.title,
      videoUrl: this.getYoutubeUrl(data.videoId),
      videoId: data.videoId
    });
  }

  renderVideoModal() {
    return (
        <Modal
            show={this.state.showVideoModal}
            onHide={this.handleCloseVideoModal.bind(this)}>
          <Row>
            <Col xs={12}
                 sm={8}
                 smOffset={2}
            >
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"
                    src={this.state.videoUrl}
                    frameborder="0"
                    allowFullScreen>
                </iframe>
              </div>
            </Col>
          </Row>
        </Modal>
    )
  }

  renderEmtpy() {
    return (
        <div className="well">
            <h1 className="text-center">No Saved Videos</h1>
        </div>
    )
  }

  renderFavorites() {
    return this.props.favorites && this.props.favorites.length ? this.props.favorites.map((data, key) => {
      
      return (
          <VideoItem key={'video-'+key}
                     data={data}
                     onClick={() => this.handleOpenVideoModal.bind(this, data)}
                     unsave={this.props.unsave}
                     hideSave
                     disableBold
                     isFavorite
          />
      )
    }) : this.renderEmtpy();
  }

  render() {

    return (
        <div className={styles.favorites}>
          <Row>
            <Col xs={12}>
                <div className="resultsList">{this.renderFavorites()}</div>
            </Col>
          </Row>
          {this.renderVideoModal()}
        </div>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
};

export default Favorites;
