
export const setUserData = (profile) => {
    return {
        type: 'SET_USER_DATA',
        profile: profile
    };
};

export const setUserDataById = (data) => {
    return {
        type: 'SET_USER_DATA_BY_ID',
        data: data
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};