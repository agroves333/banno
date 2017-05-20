import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
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
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
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

    onSuggestionsFetchRequested({ value }) {
        const inputValue = value.trim().toLowerCase();
        return inputValue.length && this.props.suggest(inputValue);
    }

    onSuggestionsClearRequested = () => {
        this.props.suggest('');
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
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
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
    query: PropTypes.string,
    placeholder: PropTypes.string,
    suggestions: PropTypes.array,
    onChange: PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
    size: PropTypes.string,
    suggest: PropTypes.func
};

SearchInput.defaultProps = {
    onChange: () => {},
    onSuggestionSelected: () => {},
    size: 'md',
    suggestions: []
};

export default SearchInput;
