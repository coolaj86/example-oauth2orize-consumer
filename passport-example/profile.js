'use strict';

module.exports.parse = function (json) {
  var profile = {}
    ;

  profile.id = json.currentUserId;
  /*
  profile.id = json.identity.id;
  profile.displayName = json.identity.first_name + ' ' + json.identity.last_name;
  profile.name = { familyName: json.identity.last_name,
                   givenName: json.identity.first_name };
  profile.emails = [{ value: json.identity.email_address }];
  */
      
  return profile;
};
