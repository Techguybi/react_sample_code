const defaultState = {
    profile: [],
};

export default function loginReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_USER_DATA_BY_ID':
            return Object.assign({}, state, {
                profile: action.data
            });
        case 'LOGOUT':
            return {};

        case 'SET_USER_DATA':
            return Object.assign({}, state, {
                profile: action.profile
            });

        default:
            return state;
    }
}