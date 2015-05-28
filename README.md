# mojang-api

[![Build Status](https://travis-ci.org/thechunknetwork/mojang-api.svg)](https://travis-ci.org/thechunknetwork/mojang-api)

`mojang-api` is a simple wrapper around the [Mojang API](http://wiki.vg/Mojang_API). It is simple and low-dependency (only needing the
excellent [request](https://www.npmjs.com/package/request) library).

## Installation

    npm install --save mojang-api

## Usage

### MojangAPI.uuidAt(username, time, cb)

Parameters:

 * **username**: The username to resolve the UUID for
 * **time**: Either a Date or a Number
 * **cb**: Callback that accepts the form of function(err, apiResponse)

Example:

    var MojangAPI = require('mojang-api');
    var date = new Date();
    date.setMonth(0); // 0 = January
    MojangAPI.uuidAt('jeb_', date, function(err, res) {
        if (err)
            console.log(err);
        else
            console.log("On " + date + ", jeb_'s UUID was " + res.id);
    });

### MojangAPI.nameHistory(uuid, cb)

Parameters:

 * **uuid**: The UUID to look up
 * **cb**: Callback that accepts the form of function(err, apiResponse)

Example:

    var MojangAPI = require('mojang-api');
    MojangAPI.nameHistory('853c80ef3c3749fdaa49938b674adae6', function(err, res) {
        if (err)
            console.log(err);
        else {
            if (res.length == 1) {
                console.log(res[0].name + " is very content with their existing username, because they didn't change it. Excellent job.")
            } else {
                var lastChange = res[res.length - 1];
                var at = new Date(lastChange.changedToAt);
                console.log(lastChange.name + " wasn't so content with their username. They last changed their username at " + at + ".");
            }
        }
    });

### MojangAPI.nameToUuid(names, cb)

Parameters:

 * **names**: The names to look up as an array or a single username as a string
 * **cb**: Callback that accepts the form of function(err, apiResponse)

Example:

    var MojangAPI = require('mojang-api');
    MojangAPI.nameToUuid('jeb_', function(err, res) {
        if (err)
            console.log(err);
        else {
            console.log(res[0].name + "? No, they're " + res[0].id + " to me.");
        }
    });

### MojangAPI.profile(uuid, cb)

Parameters:

 * **uuid**: The UUID to lookup
 * **cb**: Callback that accepts the form of function(err, apiResponse)

Example:

    var MojangAPI = require('mojang-api');
    MojangAPI.profile('853c80ef3c3749fdaa49938b674adae6', function(err, res) {
        if (err)
            console.log(err);
        else {
            console.log(res.id + " is also known as " + res.name + ".");
        }
    });
