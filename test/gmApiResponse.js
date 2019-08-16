// These are the expected responses from the GM API
// we use this when to make sure the smartcar API returns the appropriate JSON

var gmApiResponses = {
  'info': {
    'service': 'getVehicleInfo','status': '200','data': {
    'vin': { 'type': 'String', 'value': '123123412412' },
    'color': { 'type': 'String', 'value': 'Metallic Silver' },
    'fourDoorSedan': { 'type': 'Boolean', 'value': 'True' },
    'twoDoorCoupe': { 'type': 'Boolean', 'value': 'False' },
    'driveTrain': { 'type': 'String', 'value': 'v8' }
  }},
  'security': {
    'service': 'getSecurityStatus',
    'status': '200',
    'data': {
      'doors': { 'type': 'Array', 'values': [{ 'location': { 'type': 'String', 'value': 'frontLeft' }, 'locked': { 'type': 'Boolean', 'value': 'False'}}, {'location': { 'type': 'String', 'value': 'frontRight'}, 'locked': { 'type': 'Boolean', 'value': 'True' }}]
  }}},
  'energy': {
    'service': 'getEnergyService', 'status': '200', 'data': { 'tankLevel': { 'type': 'Number', 'value': '30' }, 'batteryLevel':{ 'type': 'Null', 'value': 'null' }}
  },
  'Engine': {
    'service': 'actionEngine', 'status': '200', 'actionResult': { 'status': 'EXECUTED' }
  }
};

module.exports = gmApiResponses
