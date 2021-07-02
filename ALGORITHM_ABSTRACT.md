# Basic32 Algorithm Abstraction

Basic32 encodes and decodes OTP (One-time passcode) tokens to and from a standard length Base32 string, effectively making them shorter. This abstraction is designed to walk through non-Javascript implementations.

## Ideology

Basic32 should be extremely fault-tolerant, specifically to common letter transpositions and to

## Utilized Characters

Basic32 utilizes characters `0123456789ACDEFGHJKMNPQRSTUVWXYZ` specifically in that order. All lowercase letters correspond to their uppercase counterparts.

The remaining four letters are interpreted as follows:

| User Writes | Interpreted |
| ----------- | ----------- |
| (Letter) O  | (Number) 0  |
| (Letter) I  | (Number) 1  |
| (Letter) L  | (Number) 1  |
| (Letter) B  | (Number) 8  |

## Encoding

1. Determine the number of digits of the OTP code.
2. Use `outputLength = ceil(log10(10 ^ digits) / log10(32))` or `outputLength = ceil(ln(10 ^ digits) / ln(32))` to find the number of characters to be output where `digits` is the number of digits of the OTP code.
3. Perform the following checks on the encoding input:

   - If a number, the encoding input must be less than `10 ^ digits`.
   - If a string, the length must equal digits and the characters should only be numbers (Regular expression: `/^\d{digits}$/` where `digits` is the number of digits of the OTP code).

4. Cast the input to a number.
5. Perform a base 32 encoding. This can be accomplished by looping from `outputLength - 1` to `0`, appending a string with the character in `0123456789ACDEFGHJKMNPQRSTUVWXYZ` at the `floor(input / (32 ^ loopIndex))`, and reassigning `input = input modulo (32 ^ loopIndex)`. This is represented below in pseudocode.

   ```
   characterSet = "0123456789ACDEFGHJKMNPQRSTUVWXYZ"
   encodedString = ""
   // Example given for input
   input = 123456
   digits = 6
   outputLength = ceil(log10(10 ^ 6) / log10(32)) = 4

   // This loop produces loopIndex = 3, 2, 1, 0 in that order
   for ((loopIndex = outputLength - 1) through (loopIndex is 0) change (loopIndex = loopIndex - 1))
     // Plus below is used to denote string concatenation
     // The characterAt operation considers 0 to be the starting position
     encodedString = encodedString + (characterSet characterAt floor(input / (32 ^ loopIndex)))

     // Input becomed the remainder, which can be found using a modulo operator, or manually
     input = input modulo (32 ^ loopIndex) = (input / (32 ^ loopIndex) - floor(input / (32 ^ loopIndex))) * (32 ^ loopIndex)
   ```

## License

MIT &copy; 2021 [Russell Steadman](https://github.com/russellsteadman). See LICENSE.
