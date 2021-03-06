import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Row, Col, FormGroup, FormControl, Form, Button, InputGroup, Glyphicon} from 'react-bootstrap';
const InputGroupButton = InputGroup.Button;

import {decodeURL} from 'utils/URL';

import SearchInput from 'components/SearchInput';

// Actions
import {search} from 'actions/search'
import {suggest} from 'actions/suggest';

import styles from 'css/components/search';

class Search extends Component {

    constructor(props) {
        super(props);

        this.form = null;
        this.input = null;
        this.state = {
            query: '',
            value: ''
        };

        this.handleOnSuggestionSelected = this.handleOnSuggestionSelected.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.form).onsubmit = (e) => {
            this.search();
            return false;
        }
    }

    search() {
        if (this.state.query !== '') {
            this.props.search(this.state.query);
        }
    }

    handleOnChange(value) {
        this.setState({
            query: value
        })
    }

    handleOnSuggestionSelected(value) {
        this.setState({
            query: value
        }, () => {
            this.search();
        });
    }

    render() {
        return (
            <div className={styles.search}>
                <Form ref={ref => this.form = ref}>
                    <FormGroup bsSize="lg">
                        <InputGroup>
                            <SearchInput
                                ref={ref => this.input = ref}
                                query={this.state.query}
                                suggestions={this.props.suggestions}
                                placeholder="Search"
                                onChange={this.handleOnChange}
                                onSuggestionSelected={this.handleOnSuggestionSelected}
                                value={this.state.query}
                                size="lg"
                                suggest={this.props.suggest}
                            />
                            <InputGroupButton>
                                <Button
                                    onClick={this.search}
                                    bsSize="lg"
                                    bsStyle="success">
                                    <Glyphicon className={styles.icon}
                                               glyph="search"/>
                                </Button>

                            </InputGroupButton>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

Search.propTypes = {
    query: PropTypes.string,
};

function mapStateToProps(state) {

    return {
        query: state.query,
        suggestions: state.suggestions
    }
}

export default connect(mapStateToProps, {search, suggest})(Search);
