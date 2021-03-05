/*jshint expr: true*/

const expect = require("chai").expect;
const sinon = require("sinon");

var jsFile = "../src/foo.js";

global.context = {
  getVariable: function (s) {},
  setVariable: function (s) {},
};

describe("feature: foo", function () {
  var contextGetVariableMethod, contextSetVariableMethod;

  // This method will execute before every it() method in the test
  // we are stubbing all Apigee objects and the methods we need here
  beforeEach(function () {
    contextGetVariableMethod = sinon.stub(context, "getVariable");
    contextSetVariableMethod = sinon.spy(context, "setVariable");
  });

  // restore all stubbed methods back to their original implementation
  afterEach(function () {
    contextGetVariableMethod.restore();
    contextSetVariableMethod.restore();
  });

  it("bar is found", function () {

    contextGetVariableMethod.withArgs("users").returns(JSON.stringify(["user1", "user2"]));

    requireUncached(jsFile);

    expect(contextSetVariableMethod.calledOnce).to.be.true;

    expect(contextSetVariableMethod.firstCall.args[0]).to.equal("foundBar");
    expect(contextSetVariableMethod.firstCall.args[1]).to.equal(true);
  });
});

// node.js caches modules that is imported using 'require'
// this utility function prevents caching between it() functions - don't forget that variables are global in our javascript file
function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function plusMinsFromCurrentTime(durationInMins) {
  var currentTime = new Date().getTime();

  var milliseconds = durationInMins * 60 * 1000;

  return new Date(currentTime + milliseconds).toISOString();
}
