// import dependencies
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var request = require('request');
var port = process.env.PORT || '3000';

var app = express();

// We use morgan for simple logging to the console
app.use(morgan('combined'));
/**
 * Sends a request to GM API to retrieve vehicle information.
 */
app.get('/vehicles/:id', function(req, res) {
  request.post({
    headers: {'Content-Type': 'application/json'},
    url: 'http://gmapi.azurewebsites.net/getVehicleInfoService',
    body: {
      'id': req.params.id,
      'responseType': 'JSON'
    },
    json: true
  }, function(err, response, body) {
    // Ensure the request is not null
    if (response.statusCode == 200) {
      const info = {
        'vin': body.data.vin.value,
        'color': body.data.color.value,
        'doorCount': body.data.fourDoorSedan.value === 'True' ? 4 : 2,
        'driveTrain': body.data.driveTrain.value
      }
      res.json(info)
    } else {
      res.status(500).send('Error occured when sending request to GM API')
    }
  });
});

/**
 * Vehicle doors
 */
app.get('/vehicles/:id/doors', function(req, res) {
  request.post({
    headers: {'Content-Type': 'application/json'},
    url: 'http://gmapi.azurewebsites.net/getSecurityStatusService',
    body: {
      'id': req.params.id,
      'responseType': 'JSON'
    },
    json: true
  }, function(err, response, body) {
    // Ensure the request is not null
    if (response.statusCode == 200) {
      var updatedBody = [];
      body.data.doors.values.forEach(function(door) {
        updatedBody.push({
            location: door.location.value,
            locked: door.locked.value === 'True'
          })
      });
      res.json(updatedBody)
    } else {
      res.status(500).send('Error occured when sending request to GM API')
    }
  });
});

/**
 * Vehicle fuel
 */
app.get('/vehicles/:id/fuel', function(req, res) {
  request.post({
    headers: {'Content-Type': 'application/json'},
    url: 'http://gmapi.azurewebsites.net/getEnergyService',
    body: {
      'id': req.params.id,
      'responseType': 'JSON'
    },
    json: true
  }, function(err, response, body) {
    // Ensure the request is not null
    if (response.statusCode == 200) {
      const info = {
        percent: body.data.tankLevel.value === 'null' ? 0 : body.data.tankLevel.value
      }
      res.json(info)
    } else {
      res.status(500).send('Error occured when sending request to GM API')
    }
  });
});

/**
 * Vehicle battery
 */
app.get('/vehicles/:id/battery', function(req, res) {
  request.post({
    headers: {'Content-Type': 'application/json'},
    url: 'http://gmapi.azurewebsites.net/getEnergyService',
    body: {
      'id': req.params.id,
      'responseType': 'JSON'
    },
    json: true
  }, function(err, response, body) {
    // Ensure the request is not null
    if (response.statusCode == 200) {
      const info = {
        percent: body.data.batteryLevel.value === 'null' ? 0 : body.data.batteryLevel.value
      }
      res.json(info)
    } else {
      res.status(500).send('Error occured when sending request to GM API')
    }
  });
});

/**
 * Start/stop vehicle engine
 */
app.post('/vehicles/:id/engine', function(req, res) {
  request.post({
    headers: {'Content-Type': 'application/json'},
    url: 'http://gmapi.azurewebsites.net/actionEngineService',
    body: {
      'id': req.params.id,
      'command': req.query.action === 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE',
      'responseType': 'JSON'
    },
    json: true
  }, function(err, response, body) {
    // Ensure the request is not null
     if (response.statusCode == 200) {
      const info = {
        'status': body.actionResult.status === 'EXECUTED' ? 'success' : 'error'
      }
      res.json(info);
    } else {
      res.status(500).send('Error occured when sending request to GM API')
    }
  });
});

app.listen(port, function() {
  console.log("Listening on port %s", port)
});

module.exports = app;
