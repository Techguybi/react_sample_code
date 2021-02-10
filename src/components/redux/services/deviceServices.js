import config from '../../../config'
const url = config.apiUrl

export const deviceServices = {
    devicesAction: devicesAction,
    groupsDevices: groupsDevices,
    devicesEdit: devicesEdit,
    devicesDelete: devicesDelete
}

function devicesAction(data, cb) {
    
    fetch(url+'devices', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic "+window.btoa('vinod' + ':' + 'vinod123!')
        }
    }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (response.status != 200) {
            response.text().then(function(res){
               alert(res);
            })
            cb(response.statusText);
            return;
        } else {
            return response.json();
        }
    }).then((responseJson) => {
        cb(responseJson);
    }).catch(error => {
        console.log('error', error)
    });

}

function groupsDevices(cb) {

    fetch(url + 'devices', {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic " + window.btoa('vinod' + ':' + 'vinod123!')
        }
    }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (response.status != 200) {
            response.text().then(function(res){
               alert(res);
            })
            cb(response.statusText);
            return;
        } else {
            return response.json();
        }

    }).then((responseJson) => {
        cb(responseJson);
    }).catch(error => {
        console.log('error', error)
    });

}

function devicesEdit( _id, data, cb) {
    
    fetch(url+'devices/'+_id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic "+window.btoa('vinod' + ':' + 'vinod123!')
        }
    }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (response.status != 200) {
            response.text().then(function(res){
                alert(res);
            })
            cb(response.statusText);
            return;
        } else {
            return response.json();
        }

    }).then((responseJson) => {
        cb(responseJson);
    }).catch(error => {
        console.log('error', error)
    });

}

function devicesDelete(_id, cb) {
    fetch(url + 'devices/' + _id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic " + window.btoa('vinod' + ':' + 'vinod123!')
        }
    }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (response.status != 204) {
            response.text().then(function(res){
               alert(res);
            })
            cb(response.statusText);
            return;
        } else {
            return;
        }

    }).then((responseJson) => {
        cb(responseJson);
    }).catch(error => {
        console.log('error', error)
    });

}
