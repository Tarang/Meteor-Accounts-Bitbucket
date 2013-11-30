Accounts.oauth.registerService('bitbucket');

if (Meteor.isClient) {
  Meteor.loginWithBitbucket = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Bitbucket.requestCredential(options, credentialRequestCompleteCallback);
  };
}