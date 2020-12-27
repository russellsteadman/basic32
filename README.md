# Basic32

Basic32 encodes and decodes OTP (One-time passcode) tokens to and from a standard length Base32 string, effectively making them shorter.

## Why?

Basic32 decreases the number of characters needed for a OTP code, making the code easier for users to remember.

| Regular TOTP | Encoded TOTP |
| ------------ | ------------ |
| 6 digits     | 4 chars      |
| 7 digits     | 5 chars      |
| 8 digits     | 6 chars      |
| 9 digits     | 6 chars      |

## Installation

```sh
npm i basic32
```

```javascript
import Basic32 from 'basic32';
```

## Usage

```javascript
import Basic32 from 'basic32';

/* Initialize the encoder */
const basic = new Basic32(/* Number of digits in OTP code, default: 6 */);

/* Encode a number or string */
basic.encode(123456); // -> "3WX0"
basic.encode('123456'); // -> "3WX0"

/* Decode a string */
basic.decode('3WX0'); // -> "123456"

/* Decode a string, but zero is switched with letter o */
basic.decode('3WXO'); // -> "123456"

/* Decode the wrong number of characters */
basic.decode('3WX0A'); // -> new Error("Code should be 4 alphanumeric characters")

/* Decode an already decoded string */
basic.decode('123456'); // -> "123456"
```

## Character Corrections

The following character transposition errors are automatically fixed.

| User Writes | Interpreted |
| ----------- | ----------- |
| (Letter) O  | (Number) 0  |
| (Letter) I  | (Number) 1  |
| (Letter) L  | (Number) 1  |
| (Letter) B  | (Number) 8  |

## License

MIT &copy; 2020 [Russell Steadman](https://github.com/teamtofu). See LICENSE.
