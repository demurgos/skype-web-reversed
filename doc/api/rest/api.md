# REST API for api.skype.com

- /search/users?skypename=**${skypeName}**
- /search/users/any?keyWord=**${keyword}**
- /search/users/any?keyWord=**${keyword}**&contactTypes[]=skype
- /users/batch/profiles
- /users/**:user**
- /users/**:user**/authorized-contacts
- /users/**:user**/contacts?hideDetails=true
- /users/**:user**/contacts/auth-request
- /users/**:user**/contacts/auth-request/**:contact**/accept
  - PUT
- /users/**:user**/contacts/auth-request/**:contact**/decline
  - PUT
- /users/**:user**/contacts/profiles
- /users/**:user**/contacts/**:contact**
  - DELETE
- /users/**:user**/contacts/**:contact**/block
- /users/**:user**/contacts/**:contact**/unblock
- /users/**:user**/profile
  - GET
- /users/**:user**/profile/avatar?cacheHeaders=1
- /users/**:user**/profile/avatar
  - GET

## /users/**:user**/profile

### GET

Returns the public profile of the user `user`.

`:user` is the unprefixed Skype username.
