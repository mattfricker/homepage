'use strict';

var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	app = express(),
	port = 3030,
	mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'cstk_v1'
    });

app.set('views', __dirname + '/src/client/');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/src/client/index.html');
});



//***********Web SErvices

//Strike service
app.get('/getStrikes', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT strikes.id, macros.name AS macro, strikes.micro, attacked_country.name AS attacked_country, attacking_country.name AS attacking_country, strikes.attacking_country_id, strikes.attacked_country_id, attack_types.type, attack_types.id AS type_id, strikes.date, strikes.location, strikes.num_hvt_killed AS hvts, casualty_reports.dead, casualty_reports.suspected_militant, casualty_reports.civilian, casualty_reports.unknown FROM strikes LEFT JOIN press_report_strike ON strikes.id = press_report_strike.strike_id LEFT JOIN attack_types ON strikes.attack_type_id = attack_types.id lEFT JOIN countries AS attacking_country ON attacking_country.id = strikes.attacking_country_id LEFT JOIN countries AS attacked_country ON attacked_country.id = strikes.attacked_country_id LEFT JOIN macros ON macros.id = strikes.macro_id INNER JOIN (SELECT * FROM press_reports WHERE press_report_type_id = 1) as connect ON press_report_strike.press_report_id=connect.id LEFT JOIN casualty_reports ON connect.casualty_report_id = casualty_reports.id ORDER BY strikes.date DESC', req.params.id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;         
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    strikes:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});





//Final config
app.use(express.static(__dirname));

app.listen(port);
console.log('Listening on port ' + port + '...');