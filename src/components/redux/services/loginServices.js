import config from '../../../config'
const url = config.apiUrl

export const loginServices = {
    sessionLogin: sessionLogin,
}

function sessionLogin(data, cb) {

    fetch('https://gps.optitel.com.au/api/session', {
        method: 'POST',
        withCredentials: true,
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (response.status != 200) {
            return cb(response.statusText);
        } else {
            return response.json();
        }

    }).then((responseJson) => {
        if(responseJson != undefined) {
            cb(responseJson);
        }
        
    }).catch(error => {
        console.log('error', error)
    });

}
