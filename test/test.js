var expect = require('expect.js'),
	net = require('net'),
	request = require('request'),
	config = require('../walletserv/config.js');

describe('config', function() {
	it('testing enabled', function(done) {
		expect(config.test).to.be.ok();
		done();
	});
});

describe('api', function() {

	it('address', function(done) {
		request('http://127.0.0.1:' + config.ports.api + '/' + config.allow.from[0] + '-' + config.allow.from[0] + '/mmhmMNfBiZZ37g1tgg2t8DDbNoEdqKVxAL/', function(error, response, body) {
			expect(error).not.to.exist;
			expect(response.statusCode).to.be(200);
			var obj = JSON.parse(body);
			expect(obj.address.length).to.be.greaterThan(30);
			expect(obj.secureid.length).to.be.greaterThan(19);
			done();

		})
	});

});

function stream(ports, message, callback) {
	var client = net.connect({
			port: ports
		},
		function() { //'connect' listener
			client.write(message);
			callback();
		});
}