import { CODE_CORRECT, CODE_INCORRECT } from './types';

export const checkSecretMasterCode = (code) => {
    return async (dispatch) => {
        fetch(`https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=${code}`)
            .then(res => res.json())
            .then((result) => {
                if(result.sn === '4815162342') {
                    return dispatch({
                        type: CODE_CORRECT
                    })
                } else {
                    return dispatch({
                        type: CODE_INCORRECT
                    })
                }
            })
            .catch(err => dispatch({
                type: CODE_INCORRECT
            }))
    }
}