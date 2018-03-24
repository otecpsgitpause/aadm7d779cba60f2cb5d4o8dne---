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
            if (sistem.sistem1.domain == jData.a && sistem.sistem1.urlBase == jData.b && sistem.sistem1.appPortRun == jData.c && sistem.sistem1.appProtocolRun == jData.d && sistem.sistem1.identification == jData.e) {
                request.post(sistemConf.sistem2.urlBase + sistemConf.sistem2.tkm, { form: { data: req.body.monkey } }, (err, httpResponse, body) => {
                    console.log('estoy adentro de esto');
                    console.log({sistemConfig1:sistem.sistem1});
                    console.log({sistemConfig2:sistemConf.sistem2});
                    console.log({respuestaApiRest:body});
                    cryptoUtil.cryptoMethod.encode(body).then(encode => {

                        res.json({
                            d: true,
                            t: encode
                        })
                    })

                })
            } else if (sistem.sistem3.domain == jData.a && sistem.sistem3.urlBase == jData.b && sistem.sistem3.appPortRun == jData.c && sistem.sistem3.appProtocolRun == jData.d && sistem.sistem3.identification == jData.e) {
                request.post(sistemConf.sistem2.urlBase + sistemConf.sistem2.tkm, { form: { data: req.body.monkey } }, (err, httpResponse, body) => {
                    console.log('estoy adentro de esto');
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
