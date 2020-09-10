import { combineReducers } from 'redux';

import forgetCodeReducer from './ForgetCodeReducer';

const allReducers = combineReducers({
    forgetCode: forgetCodeReducer
});

export default allReducers;