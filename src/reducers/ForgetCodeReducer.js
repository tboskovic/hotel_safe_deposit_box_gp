import { CODE_CORRECT, CODE_INCORRECT } from '../actions/types';

const INITIAL_STATE = {
    secretMasterCode: '',
    isCodeCorrect: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CODE_CORRECT: 
            return {
                ...state, isCodeCorrect: true
            }
        case CODE_INCORRECT: 
            return {
                ...state, isCodeCorrect: false
            }
        default:
            return state
    }
}