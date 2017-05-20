import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {
    ModalHeader,
    ModalBody,
    ModalTitle,
    Row,
    Col,
    Glyphicon
} from 'react-bootstrap';
import ReactModal from 'react-bootstrap/lib/Modal';

import styles from 'css/components/modal';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
    }

    handleCloseModal() {
        this.props.onHide();
    }

    renderCloseButton() {
        return (
            <Glyphicon className={styles.close}
                       glyph="remove"
                       onClick={() => this.props.onHide()}/>
        )
    }

    render() {

        return (
            <div>
                <ReactModal
                    className={styles.modal}
                    show={this.state.show}
                    onHide={this.handleCloseModal}>
                    {this.state.show && this.renderCloseButton()}
                    <ModalBody className={styles.body}>
                        {this.props.children}
                    </ModalBody>
                </ReactModal>
            </div>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
};

export default Modal;
