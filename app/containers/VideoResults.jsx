'use strict';

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
import {
    Row,
    Col,
    Nav,
    NavItem,
    ButtonToolbar,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

import VideoItem from 'components/VideoItem';
import Pager from 'components/Pager';
import Modal from 'components/Modal';
import NoResults from 'components/NoResults';

// Actions
import {search} from 'actions/search';

// Utils
import {get, has} from 'lodash';
import classnames from 'classnames';

// Styles
import filterStyles from 'css/components/filters';
import styles from 'css/components/video-results';

class VideoResults extends Component {

    constructor() {
        super();

        this.state = {
            videoUrl: '',
            videoTitle: '',
            showVideoModal: false,
            activeSort: 'relevance',
            activeDuration: 'any',
            activeDimension: 'any',
            activeDefinition: 'any'
        };

        this.handleFilter = this.handleFilter.bind(this);
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
            videoUrl: this.getYoutubeUrl(data.videoId)
        });
    }

    handleFilter(filter) {
        this.setState({
            activeSort: filter.order ? filter.order : this.state.activeSort,
            activeDuration: filter.videoDuration ? filter.videoDuration : this.state.activeDuration,
            activeDimension: filter.videoDimension ? filter.videoDimension : this.state.activeDimension,
            activeDefinition: filter.videoDefinition ? filter.videoDefinition : this.state.activeDefinition
        }, () => {
            this.props.search(this.props.query, {
                order: this.state.activeSort,
                videoDuration: this.state.activeDuration,
                videoDimension: this.state.activeDimension,
                videoDefinition: this.state.activeDefinition
            });
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

    renderFilters() {
        
        return (
            <div className={filterStyles.filters}>
                <hr/>
                <strong>Sort</strong>
                <Nav stacked
                     activeKey={this.state.activeSort}>
                    <NavItem className="filterLink" eventKey={'relevance'} title="Relevance" onClick={() => this.handleFilter({order: 'relevance'})}>Relevance</NavItem>
                    <NavItem className="filterLink" eventKey={'rating'} title="Rating" onClick={() => this.handleFilter({order: 'rating'})}>Rating</NavItem>
                    <NavItem className="filterLink" eventKey={'viewCount'} title="Rating" onClick={() => this.handleFilter({order: 'viewCount'})}>View Count</NavItem>
                    <NavItem className="filterLink" eventKey={'date'} title="Date" onClick={() => this.handleFilter({order: 'date'})}>Date</NavItem>
                    <NavItem className="filterLink" eventKey={'title'} title="Title" onClick={() => this.handleFilter({order: 'title'})}>Title</NavItem>
                </Nav>
                <hr/>
                <strong>Duration</strong>
                <Nav stacked
                     activeKey={this.state.activeDuration}>
                    <NavItem className="filterLink" eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDuration: 'any'})}>Any</NavItem>
                    <NavItem className="filterLink" eventKey={'short'} title="Short" onClick={() => this.handleFilter({videoDuration: 'short'})}>Short</NavItem>
                    <NavItem className="filterLink" eventKey={'medium'} title="Medium" onClick={() => this.handleFilter({videoDuration: 'medium'})}>Medium</NavItem>
                    <NavItem className="filterLink" eventKey={'long'} title="Long" onClick={() => this.handleFilter({videoDuration: 'long'})}>Long</NavItem>
                </Nav>
                <hr/>
                <strong>Definition</strong>
                <Nav stacked
                     activeKey={this.state.activeDefinition}>
                    <NavItem className="filterLink" eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDefinition: 'any'})}>Any</NavItem>
                    <NavItem className="filterLink" eventKey={'high'} title="HD" onClick={() => this.handleFilter({videoDefinition: 'high'})}>HD</NavItem>
                    <NavItem className="filterLink" eventKey={'standard'} title="Standard" onClick={() => this.handleFilter({videoDefinition: 'standard'})}>Standard</NavItem>
                </Nav>
                <hr/>
                <strong>Dimension</strong>
                <Nav stacked
                     activeKey={this.state.activeDimension}>
                    <NavItem className="filterLink" eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDimension: 'any'})}>Any</NavItem>
                    <NavItem className="filterLink" eventKey={'2d'} title="Short" onClick={() => this.handleFilter({videoDimension: '2d'})}>2D</NavItem>
                    <NavItem className="filterLink" eventKey={'3d'} title="Medium" onClick={() => this.handleFilter({videoDimension: '3d'})}>3D</NavItem>
                </Nav>
            </div>
        )
    }

    renderMobileFilters() {
        return (
            <div>
                <ButtonToolbar>
                    <DropdownButton bsSize="small" title="Sort" id="filters-selection">
                        <MenuItem className="filterLink" active={this.state.activeSort === 'relevance'} eventKey={'relevance'} title="Relevance" onClick={() => this.handleFilter({order: 'relevance'})}>Relevance</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeSort === 'rating'} eventKey={'rating'} title="Rating" onClick={() => this.handleFilter({order: 'rating'})}>Rating</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeSort === 'viewCount'} eventKey={'viewCount'} title="Rating" onClick={() => this.handleFilter({order: 'viewCount'})}>View Count</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeSort === 'date'} eventKey={'date'} title="Date" onClick={() => this.handleFilter({order: 'date'})}>Date</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeSort === 'title'} eventKey={'title'} title="Date" onClick={() => this.handleFilter({order: 'title'})}>Title</MenuItem>
                    </DropdownButton>
                    <DropdownButton bsSize="small" title="Duration" id="filters-selection">
                        <MenuItem className="filterLink" active={this.state.activeDuration === 'any'} eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDuration: 'any'})}>Any</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDuration === 'short'} eventKey={'short'} title="Short" onClick={() => this.handleFilter({videoDuration: 'short'})}>Short</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDuration === 'medium'} eventKey={'medium'} title="Medium" onClick={() => this.handleFilter({videoDuration: 'medium'})}>Medium</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDuration === 'long'} eventKey={'long'} title="Long" onClick={() => this.handleFilter({videoDuration: 'long'})}>Long</MenuItem>
                    </DropdownButton>
                    <DropdownButton bsSize="small" title="Def" id="filters-selection">
                        <MenuItem className="filterLink" active={this.state.activeDefinition === 'any'} eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDefinition: 'any'})}>Any</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDefinition === 'high'} eventKey={'high'} title="HD" onClick={() => this.handleFilter({videoDefinition: 'high'})}>HD</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDefinition === 'standard'} eventKey={'standard'} title="Standard" onClick={() => this.handleFilter({videoDefinition: 'standard'})}>Standard</MenuItem>
                    </DropdownButton>
                    <DropdownButton bsSize="small" title="Dimension" id="filters-selection">
                        <MenuItem className="filterLink" active={this.state.activeDimension === 'any'} eventKey={'any'} title="Any" onClick={() => this.handleFilter({videoDimension: 'any'})}>Any</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDimension === '2d'} eventKey={'2d'} title="Short" onClick={() => this.handleFilter({videoDimension: '2d'})}>2D</MenuItem>
                        <MenuItem className="filterLink" active={this.state.activeDimension === '3d'} eventKey={'3d'} title="Medium" onClick={() => this.handleFilter({videoDimension: '3d'})}>3D</MenuItem>
                    </DropdownButton>

                </ButtonToolbar>
            </div>
        );
    }

    renderResults() {

        const items = get(this.props.results, 'videos.youtube.items', []);

        if (has(this.props.results, `videos.youtube.items`) && this.props.results.videos.youtube.items.length === 0) {
          return <NoResults query={this.props.query} />
        }
      
        return items.map((data, key) => {
            return (
                <VideoItem key={'video-'+key}
                    data={data}
                    onClick={() => this.handleOpenVideoModal.bind(this, data)}
                    query={this.props.query}
                />
            )
        });
    }

    renderLoader() {
  
        const loaderClasses = classnames('loader', {
          hidden: !get(this.props.results, `videos.youtube.isLoading`, false)
        });
  
        return  <div className={loaderClasses}></div>
    }

    render() {

        return (
            <div className="results">
                <Row>
                    <Col xs={12}
                         mdHidden
                         lgHidden>
                        {this.renderMobileFilters()}
                    </Col>
                    <Col xs={12}
                         md={10}>
                        <Pager provider="youtube"
                            filter={{
                                order: this.state.activeSort,
                                videoDuration: this.state.activeDuration,
                                videoDimension: this.state.activeDimension,
                                videoDefinition: this.state.activeDefinition
                            }}>
                            <div className="resultsList">{this.renderResults()}</div>
                        </Pager>
                        {this.renderLoader()}
                    </Col>
                    <Col className={styles.rightMenu}
                         xsHidden
                         smHidden
                         md={2}>
                        {this.renderFilters()}
                    </Col>
                </Row>
                {this.renderVideoModal()}
            </div>
        );
    }
}

VideoResults.propTypes = {
    results: PropTypes.object.isRequired,
    query: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        results: state.results,
        query: state.query,
    }
};

export default connect(mapStateToProps, {search})(VideoResults);
