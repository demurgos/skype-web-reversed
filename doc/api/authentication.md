# Authentication

## Skype Token

### Obtaining the login keys

#### Request

````txt
GET https://login.skype.com/login?method=skype&client_id=578134&redirect_uri=https%3A%2F%2Fweb.skype.com
````

#### Response

The response is an HTML page with the following keys:

##### pie

Attribute `value` of `input[name="pie"]`.

##### etm

Attribute `value` of `input[name="etm"]`.

### Login

#### Request

````txt
POST https://login.skype.com/login?method=skype&client_id=578134&redirect_uri=https%3A%2F%2Fweb.skype.com
````

##### Parameters

###### username

- Type: {`string`}

###### password

- Type: {`string`}

###### pie

- Type: {`string`}

The login key `pie`.

###### etm

- Type: {`string`}

The login key `etm`.

###### timezone_field

- Type: {`string`}
- Pattern: `/^[+-](?:0\d|1[0-2])\|[0-5]\d$/`

This is the timezone offset. It is contructed as the concatenation of `sign`, `hours`, `"|"` and `minutes`:

- `sign` indicates if the offset is positive or negative relative to GMT. (If you live in the west hemisphere it's most likely `-` and `+` in the east hemisphere).
 
- `hours` is the zero-padded (to 2 characters) amount of hours.

- `minutes` is the zero-padded (to 2 characters) amount of minutes.

If there is no offset, `timezone` is `"+00|00"`.

###### js_time

- Type: {`integer`}

An epoch timestamp in **seconds**.

##### Example

````json
{
  "username": "USERNAME",
  "password": "PASSWORD",
  "pie": "PIE_KEY",
  "etm": "ETM_KEY",
  "timezone_field": "+02|30",
  "js_time": 1463428181
}
````

#### Response

The response is an HTML page with the following keys:

##### skypetoken

Attribute `value` of `input[name="skypetoken"]`.

##### expires_in

Attribute `value` of `input[name="expires_in"]`.
This is a base-10 integer indicating the number of **seconds** until the expiration of the `skypetoken`.

## RegistrationToken

**TODO**
