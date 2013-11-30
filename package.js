Package.describe({
  summary: "Login service for Bitbucket accounts"
});

Package.on_use(function(api) {
  // Bitbucket
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.export('Bitbucket');

  api.add_files(
    ['bitbucket_configure.html', 'bitbucket_configure.js'],
    'client');

  api.add_files('bitbucket_server.js', 'server');
  api.add_files('bitbucket_client.js', 'client');


  api.use('underscore', ['server']);

  // acounts-bitbucket
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files('bitbucket_login_button.css', 'client');
  api.add_files("accounts-bitbucket.js");

});
