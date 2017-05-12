# Authentication

## Login Keys

### Request

````txt
GET https://login.skype.com/login?method=skype&client_id=578134&redirect_uri=https%3A%2F%2Fweb.skype.com
````

### Response

The response is an HTML page with the following keys:

#### pie

Attribute `value` of `input[name="pie"]`.

#### etm

Attribute `value` of `input[name="etm"]`.

## SkypeToken

### Request

````txt
POST https://login.skype.com/login?method=skype&client_id=578134&redirect_uri=https%3A%2F%2Fweb.skype.com
````

#### Body

You should send a JSON document with the following parameters:

##### username

- Type: {`string`}

##### password

- Type: {`string`}

##### pie

- Type: {`string`}

The login key `pie`.

##### etm

- Type: {`string`}

The login key `etm`.

##### timezone_field

- Type: {`string`}
- Pattern: `/^[+-](?:0\d|1[0-2])\|[0-5]\d$/`

This is the timezone offset. It is contructed as the concatenation of `sign`, `hours`, `"|"` and `minutes`:

- `sign` indicates if the offset is positive or negative relative to GMT. (If you live in the west hemisphere it's most likely `-` and `+` in the east hemisphere).
 
- `hours` is the zero-padded (to 2 characters) amount of hours.

- `minutes` is the zero-padded (to 2 characters) amount of minutes.

If there is no offset, `timezone` is `"+00|00"`.

##### js_time

- Type: {`integer`}

An epoch timestamp in **seconds**.

#### Example

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

### Response

The response is an HTML page with the following keys:

#### skypetoken

Attribute `value` of `input[name="skypetoken"]`.

#### expires_in

Attribute `value` of `input[name="expires_in"]`.
This is a base-10 integer indicating the number of **seconds** until the expiration of the `skypetoken`.

## RegistrationToken

### Request

````text
POST https://{host}/v1/users/{user}/endpoints
````

#### Parameters

- Default `host` is `client-s.gateway.messenger.live.com` but you should follow redirections trough the `Location` header.
- `user` should be `ME`

#### Headers

##### LockAndKey

- `appId`, should be `msmsgs@msnmsgr.com`
- `time`, an epoch timestamp in seconds
- `lockAndKeyResponse`, the result of `hmacSha256(time, appId, "Q1P7W2E4J9R8U3S5")`

##### ClientInfo

- `os`, should be `Windows`
- `osVer`, should be `10`
- `proc`, should be `Win64`
- `lcid`, should be `en-us`
- `deviceType`, should be `1`
- `country`, should be `n/a`
- `clientName`, should be `skype.com`
- `clientVer`, should be `908/1.30.0.128`

##### Authentication

- `skypetoken`, the SkypeToken

#### Body

You must set the body to the string `{}`.

### Response

#### Headers

##### Location

Parse the URI to get the new host. Perform the request again using this new host.

##### set-registrationtoken

A parametrized header:

- `registrationToken`, a base64 string
- `expires`, an epoch timestamp in seconds indicating the expiration date.
- `endpointId`, the id of your endpoint
