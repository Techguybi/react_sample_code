import config from '../../../config'
const url = config.apiUrl

export const commonServices = {
    groupsAdd: groupsAdd,
    groupsDisplay: groupsDisplay,
    groupsEdit: groupsEdit,
    groupsDelete: groupsDelete,
    UserAllDisplay: UserAllDisplay,
    usersAdd: usersAdd,
    getServer: getServer,
    updateServer: updateServer,
    addCalendar: addCalendar,
    editCalendar: editCalendar,
    getNotificaions: getNotificaions,
    addNotification: addNotification,
    notificationDelete: notificationDelete,
    notificationEdit: notificationEdit,
    getCalendars: getCalendars,
    getGeofence: getGeofence,
    addGeofence: addGeofence,
    geofenceDelete: geofenceDelete,
    geofenceEdit: geofenceEdit,
    calenderDelete: calenderDelete,
    addDriver: addDriver,
    getDrivers: getDrivers,
    driverEdit: driverEdit,
    driverDelete: driverDelete,
    getComputedAttributes: getComputedAttributes,
    computedAttributesDelete: computedAttributesDelete,
    addComputedAttributes: addComputedAttributes,
    computedAttributesEdit: computedAttributesEdit,
    getSavedCommands: getSavedCommands,
    savedCommandsDelete: savedCommandsDelete,
    addSavedCommands: addSavedCommands,
    savedCommandsEdit: savedCommandsEdit,
    addMaintenance: addMaintenance,
    getMaintenance: getMaintenance,
    editMaintenance:editMaintenance,
    maintenanceDelete: maintenanceDelete,
    doRegister: doRegister
}

function groupsAdd(data, cb) {

    fetch(url + 'groups', {
        method: 'POST',
        body: JSON.stringify(data),
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

function groupsEdit(_id, data, cb) {
    fetch(url + 'groups/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function groupsDelete(_id, cb) {
    fetch(url + 'groups/' + _id, {
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

function groupsDisplay(cb) {

    fetch(url + 'groups', {
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

function UserAllDisplay(cb) {

    fetch(url + 'users', {
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


function usersAdd(_id, data, cb) {

    fetch(url + 'users/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function getServer(cb) {

    fetch(url + 'server', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function updateServer(data, cb) {

    fetch(url + 'server', {
        method: 'PUT',
        body: JSON.stringify(data),
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

function addCalendar(data, cb) {

    fetch(url + 'calendars', {
        method: 'POST',
        body: JSON.stringify(data),
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

function editCalendar(_id, data, cb) {

    fetch(url + 'calendars/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function getNotificaions(cb) {

    fetch(url + 'notifications', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function addNotification(data, cb) {

    fetch(url + 'notifications', {
        method: 'POST',
        body: JSON.stringify(data),
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

function notificationDelete(_id, cb) {
    fetch(url + 'notifications/' + _id, {
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

function notificationEdit(_id, data, cb) {
    fetch(url + 'notifications/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function getCalendars(cb) {

    fetch(url + 'calendars', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function getGeofence(cb) {
    fetch(url + 'geofences', {
        method: 'GET',
        // body: JSON.stringify(data),
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
function calenderDelete(_id, cb) {
    fetch(url + 'calendars/' + _id, {
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

function addGeofence(data, cb) {

    fetch(url + 'geofences', {
        method: 'POST',
        body: JSON.stringify(data),
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

function geofenceEdit(_id, data, cb) {
    fetch(url + 'geofences/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function addDriver(data, cb) {

    fetch(url + 'drivers', {
        method: 'POST',
        body: JSON.stringify(data),
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

function geofenceDelete(_id, cb) {
    fetch(url + 'geofences/' + _id, {
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

function getComputedAttributes(cb) {

    fetch(url + 'attributes/computed', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function computedAttributesDelete(_id, cb) {
    fetch(url + 'attributes/computed/' + _id, {
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

function addComputedAttributes(data, cb) {

    fetch(url + 'attributes/computed', {
        method: 'POST',
        body: JSON.stringify(data),
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

function computedAttributesEdit(_id, data, cb) {
    fetch(url + 'attributes/computed/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function getSavedCommands(cb) {

    fetch(url + 'commands', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function savedCommandsDelete(_id, cb) {
    fetch(url + 'commands/' + _id, {
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

function addSavedCommands(data, cb) {

    fetch(url + 'commands', {
        method: 'POST',
        body: JSON.stringify(data),
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

function savedCommandsEdit(_id, data, cb) {
    fetch(url + 'commands/' + _id, {
        method: 'PUT',
        body: JSON.stringify(data),
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

function addMaintenance(data, cb) {

    fetch(url + 'maintenance', {
        method: 'POST',
        body: JSON.stringify(data),
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


function getDrivers(cb) {
    
    fetch(url+'drivers', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function driverEdit(_id, data, cb) {
    fetch(url+'drivers/'+_id, {
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

function driverDelete(_id, cb) {
    fetch(url+'drivers/'+_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic "+window.btoa('vinod' + ':' + 'vinod123!')
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

function getMaintenance(cb) {
    
    fetch(url+'maintenance', {
        method: 'GET',
        // body: JSON.stringify(data),
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

function editMaintenance(_id, data, cb) {
    fetch(url+'maintenance/'+_id, {
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

function maintenanceDelete(_id, cb) {
    fetch(url+'maintenance/'+_id, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Basic "+window.btoa('vinod' + ':' + 'vinod123!')
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

function doRegister(data, cb) {
    fetch(url + 'users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
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
