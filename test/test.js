var Lab = require('lab');
var expect = require('chai').expect;
var lab = Lab.script();
var MojangAPI = require('../lib');

// This username and UUID is unlikely to change, given this is one of the "official" Mojang skin accounts.
// See http://minecraft.gamepedia.com/Mob_head#Mojang_skins
var USERNAME = 'MHF_Chicken';
var UUID = '92deafa9430742d9b00388601598d6c0';

// For namesToUuid test, second username:
var USERNAME2 = 'MHF_Cake';

lab.experiment('MojangAPI', function() {
    lab.experiment('uuidAt', function() {
        lab.experiment('throws an Error if', function() {
            lab.test('username was not specified', function(done) {
                expect(MojangAPI.uuidAt).to.throw(Error);
                done();
            });

            lab.test('username was not valid', function(done) {
                expect(function() {
                    MojangAPI.uuidAt(42)
                }).to.throw(Error);
                done();
            });

            lab.test('date was not specified', function(done) {
                expect(function() {
                    MojangAPI.uuidAt(USERNAME)
                }).to.throw(Error);
                done();
            });

            lab.test('date was not valid', function(done) {
                expect(function() {
                    MojangAPI.uuidAt(USERNAME, 'derp')
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not specified', function(done) {
                expect(function() {
                    MojangAPI.uuidAt(USERNAME, new Date())
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not a function', function(done) {
                expect(function() {
                    MojangAPI.uuidAt(USERNAME, new Date(), 42)
                }).to.throw(Error);
                done();
            });
        });

        lab.experiment('works when timestamp is a', function() {
            lab.test('number', function(done) {
                MojangAPI.uuidAt(USERNAME, 1432789369, function(err, resp) {
                    expect(err).to.be.null;
                    expect(resp).to.have.property('id').and.equal(UUID);
                    expect(resp).to.have.property('name', USERNAME);
                    done();
                });
            });

            lab.test('Date', function(done) {
                MojangAPI.uuidAt(USERNAME, new Date(1432789369000), function(err, resp) {
                    expect(err).to.be.null;
                    expect(resp).to.have.property('id', UUID);
                    expect(resp).to.have.property('name', USERNAME);
                    done();
                });
            });
        });
    });

    lab.experiment('nameHistory', function() {
        lab.experiment('throws an Error if', function() {
            lab.test('username was not specified', function(done) {
                expect(MojangAPI.nameHistory).to.throw(Error);
                done();
            });

            lab.test('username was not valid', function(done) {
                expect(function() {
                    MojangAPI.nameHistory(42)
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not specified', function(done) {
                expect(function() {
                    MojangAPI.nameHistory(UUID)
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not a function', function(done) {
                expect(function() {
                    MojangAPI.nameHistory(UUID, 'hi')
                }).to.throw(Error);
                done();
            });
        });

        lab.test('produces correct results', function(done) {
            MojangAPI.nameHistory(UUID, function(err, resp) {
                expect(err).to.be.null;
                expect(resp).to.be.instanceof(Array);
                done();
            });
        });
    });

    lab.experiment('nameToUuid', function() {
        lab.experiment('throws an error if', function() {
            lab.test('names are not specified', function(done) {
                expect(MojangAPI.nameToUuid).to.throw(Error);
                done();
            });

            lab.test('names was not valid', function(done) {
                expect(function() {
                    MojangAPI.nameToUuid(42)
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not specified', function(done) {
                expect(function() {
                    MojangAPI.nameToUuid(USERNAME);
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not a function', function(done) {
                expect(function() {
                    MojangAPI.nameToUuid(USERNAME, 'hi')
                }).to.throw(Error);
                done();
            });
        });

        lab.experiment('works when names is a', function() {
            lab.test('string', function(done) {
                MojangAPI.nameToUuid(USERNAME, function(err, resp) {
                    expect(err).to.be.null;
                    expect(resp).to.be.instanceof(Array);
                    done();
                });
            });

            lab.test('single-element Array', function(done) {
                MojangAPI.nameToUuid([USERNAME], function(err, resp) {
                    expect(err).to.be.null;
                    expect(resp).to.be.instanceof(Array);
                    done();
                });
            });

            lab.test('multi-element Array', function(done) {
                MojangAPI.nameToUuid([USERNAME, USERNAME2], function(err, resp) {
                    expect(err).to.be.null;
                    expect(resp).to.be.instanceof(Array).and.have.length(2);
                    done();
                });
            });
        });
    });

    lab.experiment('profile', function() {
        lab.experiment('throws an Error if', function() {
            lab.test('uuid was not specified', function(done) {
                expect(MojangAPI.profile).to.throw(Error);
                done();
            });

            lab.test('uuid was not valid', function(done) {
                expect(function() {
                    MojangAPI.profile(42)
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not specified', function(done) {
                expect(function() {
                    MojangAPI.profile(UUID)
                }).to.throw(Error);
                done();
            });

            lab.test('callback was not a function', function(done) {
                expect(function() {
                    MojangAPI.profile(UUID, 'hi')
                }).to.throw(Error);
                done();
            });
        });

        lab.test('produces correct results', function(done) {
            MojangAPI.profile(UUID, function(err, resp) {
                expect(err).to.be.null;
                expect(resp).to.have.property('id', UUID);
                expect(resp).to.have.property('name', USERNAME);
                expect(resp).to.have.property('properties').and.to.be.instanceof(Array);
                done();
            });
        });
    });
});

exports.lab = lab;