'use strict'

var usersJsonString = context.getVariable("users")
var usersList = JSON.parse(usersJsonString)

var foundUser = false;

if (usersList) {
    usersList.forEach(function (user) {
        console.log(`found bar: ${user}`)

        foundUser = true;
    })
}

if (foundUser) {
    console.log("bar is found");
}

context.setVariable('foundBar', foundUser);
