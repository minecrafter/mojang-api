var request = require('request');

var _simpleGet = function(url, cb) {
    request(url, { json: true }, function(err, res, body) {
        if (typeof body === 'undefined')
            return cb(new Error('body is undefined'));

        if (body.error)
            return cb(new Error(body.error + ": " + body.errorMessage));

        cb(null, body);
    });
};

var uuidAt = function(username, time, cb) {
    if (typeof username !== "string")
        throw new Error('username is not a string');

    var unixTimestamp;

    if (time instanceof Date) {
        unixTimestamp = Math.ceil(time.getTime() / 1000);
    } else if (typeof time === 'number') {
        unixTimestamp = Math.ceil(time);
    } else {
        throw new Error('timestamp was not a Number or Date');
    }

    _simpleGet('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + unixTimestamp, cb);
};

var nameHistory = function(uuid, cb) {
    if (typeof uuid !== "string")
        throw new Error('uuid is not a string');

    _simpleGet('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names', cb);
};

var nameToUuid = function(names, cb) {
    var nameArray;

    if (names instanceof Array)
        nameArray = names;
    else if (typeof names === "string")
        nameArray = [names];
    else
        throw new Error('names is not a string or Array');

    request.post('https://api.mojang.com/profiles/minecraft', { json: true, body: nameArray }, function(err, res, body) {
        if (body.error)
            return cb.error(new Error(body.error + ": " + body.errorMessage));

        cb(null, body);
    });
};

var profile = function(uuid, cb) {
    if (typeof uuid !== "string")
        throw new Error('uuid is not a string');

    _simpleGet('https://sessionserver.mojang.com/session/minecraft/profile/' + uuid, cb);
};

module.exports = {
    uuidAt: uuidAt,
    nameHistory: nameHistory,
    nameToUuid: nameToUuid,
    profile: profile
};