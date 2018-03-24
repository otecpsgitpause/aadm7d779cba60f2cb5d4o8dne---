'use strict'

var express = require('express');
var conectorController = require('../../controller/conector-controller/conector-controller');
var api = express.Router();

//post authenticate
api.post('/oZmFLHayf8LdRXPRyxCW8K9rPJfo85tnG7S6O5eoiozUQs5uszS7aFlusxXpwUnRm5CC4oYD55kFqP4SNlQryOMuF', conectorController.conector.authenticate);
api.post('/wGIQO3GmlKJUa5UQfEaBjC6qJcMbZft3x3nbmokZQXt1UYf5JbMeW4w', conectorController.conector.getUrls);
module.exports = {
    api
}