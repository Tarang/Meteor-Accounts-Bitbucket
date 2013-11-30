Bitbucket = {};

// Request Bitbucket credentials for the user
// @param options {optional}  XXX support options.requestPermissions
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Bitbucket.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'bitbucket'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();
  // We need to keep credentialToken across the next two 'steps' so we're adding
  // a credentialToken parameter to the url and the callback url that we'll be returned
  // to by oauth provider

  // url back to app, enters "step 2" as described in
  // packages/accounts-oauth1-helper/oauth1_server.js
  var callbackUrl = Meteor.absoluteUrl('_oauth/bitbucket?close&state=' + credentialToken);

  // url to app, enters "step 1" as described in
  // packages/accounts-oauth1-helper/oauth1_server.js
  var url = '/_oauth/bitbucket/?requestTokenAndRedirect='
        + encodeURIComponent(callbackUrl)
        + '&state=' + credentialToken;

  var dimensions = {
    width: 1224,
    height: 629
  }

  Oauth.initiateLogin(credentialToken, url, credentialRequestCompleteCallback, dimensions);
};