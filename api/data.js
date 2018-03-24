var http = require('http');
var conectorApi = {
    setData: setData
}
var option = {
    host: 'http://localhost',
    port: 9000,
    path: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ/eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJpYXQiOjE1MDE4NzM5NDMsImV4cCI6MTUwMTg4MDk0M3',
    method: 'POST'
};

function setData(data) {
    http.request(option, () => {

    })
}

module.exports = {
    conectorApi
}