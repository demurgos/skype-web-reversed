# HMAC-SHA256

This document describes the [Hash-based message authentication code (HMAC)](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) based on the [Secure Hash Algorithm 256 (SHA256)](https://en.wikipedia.org/wiki/SHA-2) used by Skype during the authentication. This seems to be a Skype-specific algorithm.

## Algorithm

### Parameters

This algorithm takes three parameters, they are all unsigned 8-bit integer arrays.

If you have strings, you must first convert them to a buffer. (The algorithm was only seen used with ASCII strings, we recommend using UTF8 when converting unicode strings to an uint8 buffer).

If you have other types (ie. number, objects, etc.), we recommend to first serialize it to a string and then convert the string a buffer.

The three parameters are:

- `input`
- `id`
- `key`

### Message

The first step is to compute `message8` as the concatenation of `input`, `id` and `padding`.

`padding` is an uint8 array filled with `48` (ASCII character `'0'`). It's length is computed as:
````
length(padding) = (8 - ((length(input) + length(id)) mod 8)) mod 8
````

The goal of `padding` is to ensure that the length of `message8` is a multiple of 8.

````text
+-----------------------+-----------------------+-----------------------+
|00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|
+-----------------------+--------+--------------+--------+--------------+
|             INPUT              |          ID           |   PADDING    |
+--------------------------------+-----------------------+--------------+
|                                    MESSAGE8                           |
+-----------------------------------------------------------------------+
````

`message8` is an uint8 array.

The next step is to build `message32` by merging the cells 4 by 4 to obtain an array of uint32 (big-endian). (It's just reinterpretation of the values.)

Here is an example where `message8` is an array of 16 uint8.

````text
+------------------+-----------------------------------------------+
|index in message8 |00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|
+------------------+-----------------------------------------------+
|value in message8 |fa|e1|42|34|13|bd|c9|h1|4a|ed|1a|ff|1a|45|7a|57| (values are given in hexadecimal)
+------------------+-----------+-----------+-----------+-----------+
|index in message32|    00     |    01     |    02     |    03     |
+------------------+-----------------------------------------------+
|value in message32| fae14234  | 13bdc9h1  | 4aed1aff  | 1a457a57  | (values are given in hexadecimal)
+------------------+-----------+-----------+-----------+-----------+
````

### SHA256

You will now have to compute `sha256` as the [SHA256](https://en.wikipedia.org/wiki/SHA-2) of the concatenation of `input` and `key`.

`sha256` should be an array of 32 uint8 (256 bits).

Finally, we will truncate `sha256` to 16 uint8 (keep the cells with index in range 0-15) and reinterprete it as an array
of 4 uint32 (big-endian) called `sha256Parts`. The transformation from an array of uint8 to an array of uint32 is the
same as above (from `message8` to `message32`).

You should have `sha256Parts` an array of 4 uint32.

### checkSum64

We will now use `message32` and `sha256Parts` to compute `checksum64`, a 64-bits checksum (represented as a an array of two uint32).

#### Initialization

We initialize 9 BigIntegers. (You should use a big-integer library). In the following part, `&` denotes a bitwise `AND`.

- `MAX_INT32` (BigInteger) is `0x7fffffff` (beware, its not an error: you should use the maximum value of a _signed_ integer on 32 bits)
- `MAGIC` (BigInteger) is `0x0e79a9c1`
- `HASH_0` (BigInteger) is `sha256Parts[0] & MAX_INT32`
- `HASH_1` (BigInteger) is `sha256Parts[1] & MAX_INT32`
- `HASH_2` (BigInteger) is `sha256Parts[2] & MAX_INT32`
- `HASH_3` (BigInteger) is `sha256Parts[3] & MAX_INT32`
- `temp` (BigInteger) is `0`
- `low` (BigInteger) is `0`
- `high` (BigInteger) is `0`

#### Computation

To compute the final value of `low` and `high`, we will iterate over `message32` with a step of 2. The index `i` will
take the values `0`, `2`, `4`, etc. up to `length(message32) - 2` (included).

````text
for (i from 0 to length(message) - 2 step 2) {
  temp = (message[i + 1] * MAGIC) mod MAX_INT32;
  low = ((low + temp) * HASH_0 + HASH_1) mod MAX_INT32;
  high = high + low;
  
  temp = message[i + 1];
  low = ((low + temp) * HASH_2 + HASH_3) mod MAX_INT32;
  high = high + low;
}
````

#### `checkSum64`

Finally, the result `checkSum64` (array of 2 uint32) is built as:

````text
checkSum64[0] = castToUint32((low + HASH_1) mod MAX_INT32);
checkSum64[1] = castToUint32((high + HASH_3) mod MAX_INT32);
````

### Output

`ouput32` is a an array 4 uint32 such as:
````text
ouput32[0] = sha256Parts[0] ^ checkSum64[0]
ouput32[1] = sha256Parts[1] ^ checkSum64[1]
ouput32[2] = sha256Parts[2] ^ checkSum64[0]
ouput32[3] = sha256Parts[3] ^ checkSum64[1]
````
Where `^` denotes a bitwise `XOR`.

Finally, `output8` is an array of 16 uint8 computed by splitting each cell of `ouput32` **using a little-endian representation of uint32**.

For example the value `0x01234567` leads to the four cells `[0x67, 0x45, 0x23, 0x01]`.

## Result

`output8` (an array of 16 uint8) is the final result of the `HMAC-SHA256` algorithm. You can convert it to an hexadecimal
string to get the `lockAndKeyResponse` value used to acquire the `RegistrationToken`.
