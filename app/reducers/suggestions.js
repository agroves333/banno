import {SUGGEST} from 'types';

const suggestions = (state = [], action) => {
    switch (action.type) {
        case SUGGEST:
            return action.suggestions

        default:
            return state;
    }
};

export default suggestions;