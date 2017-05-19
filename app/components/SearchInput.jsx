'use strict';

import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux';
import Autosuggest from 'react-autosuggest';
import {suggest, placesSuggest} from 'actions/suggest';
import {Glyphicon} from 'react-bootstrap';
import classnames from 'classnames';

import theme from 'css/autosuggest-theme.css';
import styles from 'css/components/search-input';

class SearchInput extends Component {

    constructor() {
        super();

        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.handleEraseClick = this.handleEraseClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.value !== 'undefined') {
            this.setState({
                value: nextProps.value,
            })
        }
    }

    onChange(event, { newValue }) {
        if (typeof newValue !== 'undefined' || newValue === '') {
            this.setState({
                value: newValue
            }, () => {
                this.props.onChange(newValue);
            });
        }

    }

    onSuggestionsUpdateRequested({ value }) {
        const inputValue = value.trim().toLowerCase();
        return inputValue.length && this.props.dispatch(suggest(inputValue));
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            value: []
        });
    };

    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        this.setState({
            value: suggestionValue
        }, () => {
            this.props.onSuggestionSelected(suggestionValue);
        })
    }

    handleEraseClick(event) {
        this.setState({
            value: ''
        })
    }

    getSuggestionValue(suggestion) {
        return suggestion;
    }

    renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        );
    }

    render() {
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value,
            onChange: this.onChange,
            className: classnames('form-control', styles.input)
        };

        return (
            <Autosuggest theme={theme}
              suggestions={this.props.suggestions}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
        );
    }
}

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    suggestions: PropTypes.array,
    onChange: PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.string
};

SearchInput.defaultProps = {
    onChange: () => {},
    onSuggestionSelected: () => {},
    size: 'md',
    suggestions: []
};

function mapStateToProps(state) {

    return {
        suggestions: state.suggestions,
        query: state.query,
    }
}

export default connect(mapStateToProps)(SearchInput);
