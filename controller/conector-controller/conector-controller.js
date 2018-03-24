'use strict'
var request, cryptoUtil, urls, sistemConf;
urls = require('../../datasArchivos/urls.json');
sistemConf = require('../../api/sistemConf.json');
request = require('request');
cryptoUtil = require('../../util/cryptojs-util');

var conector = {
    authenticate: function(req, res) {
        //descrypt data
        let jData, sistem = sistemConf;
        cryptoUtil.cryptoMethod.decode(req.body.monkey).then((decode1) => {
            jData = JSON.parse(decode1);
            console.log(jData);
            if (sistem.sistem1.domain == jData.a) {
                request.post('https://aadm41ad8cdp90b2m04aepi98p---.herokuapp.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ/eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJpYXQiOjE1MDE4NzM5NDMsImV4cCI6MTUwMTg4MDk0M3', { form: { data: req.body.monkey } }, (err, httpResponse, body) => {
                    console.log('estoy adentro de if');
                    console.log({sistemConfig1:sistem.sistem1});
                    console.log({sistemConfig2:sistemConf.sistem2});
                    console.log({respuestaApiRest:body,error:err,httpResponse:httpResponse});
                    cryptoUtil.cryptoMethod.encode(body).then(encode => {

                        res.json({
                            d: true,
                            t: encode
                        })
                    })

                })

                //sistemConf.sistem2.urlBase + sistemConf.sistem2.tkm
            } else if (sistem.sistem3.domain == jData.a) {
                request.post('https://aadm41ad8cdp90b2m04aepi98p---.herokuapp.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ/eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3QiLCJpYXQiOjE1MDE4NzM5NDMsImV4cCI6MTUwMTg4MDk0M3', { form: { data: req.body.monkey } }, (err, httpResponse, body) => {
                    console.log('estoy adentro de else if');
                    console.log({sistemConfig1:sistem.sistem1});
                    console.log({sistemConfig2:sistemConf.sistem2});
                    console.log({respuestaApiRest:body,error:err,httpResponse:httpResponse});
                    cryptoUtil.cryptoMethod.encode(body).then(encode => {

                        res.json({
                            d: true,
                            t: encode
                        })
                    })

                })
            } else {
                res.json({ d: false })
            }
        })

    },
    getUrls: function(req, res) {
        let data = req.body.monkey;
        console.log({ monkeyDatos: req.body.monkey });
        cryptoUtil.cryptoMethod.decode(data).then(d => {
            let jData = JSON.parse(d);

            if (jData.getUrl != undefined && jData.getUrl == true) {
                let setData = JSON.stringify({ url: urls, t: jData.t });
                cryptoUtil.cryptoMethod.encode(setData).then(enc => {

                    res.json({
                        d: enc
                    })
                })

            } else if (jData.petition != undefined && jData.petition == true) {

                //funciona como un tipo router urls
                console.log('aaaa una noca');
                conector.genericRouter(req, res, data).then((r) => {
                    res.json({
                        d: r
                    })
                });
            }

        })

    },
    genericRouter: function(req, res, data) {
        return new Promise((resolve, reject) => {
            cryptoUtil.cryptoMethod.decode(data).then((d) => {
                let jData = JSON.parse(d);
                console.log(jData.d.c);
                request.post(sistemConf.sistem2.urlBase + jData.d.u.url, { form: { token: jData.d.t, data: jData.d.c } }, (err, httpResponse, body) => {
                    resolve(body);


                })


            })

        })

    }
}



module.exports = {
    conector
}
