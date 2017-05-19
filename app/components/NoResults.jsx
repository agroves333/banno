'use strict';

import React from 'react';
import styles from 'css/components/no-results';

const NoResults = (props) => {
    return (
        <div className={styles.noResults}>
            <strong>No search results were found for "{props.query}"</strong>
            <br/>
            <br/>
            <div>Suggestions:</div>
            <br/>
            <ul>
                <li>Make sure all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
                <li>Try fewer keywords.</li>
            </ul>
        </div>
    )
};

export default NoResults;
