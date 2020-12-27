const SIMILAR_CHAR = {
  O: '0',
  I: '1',
  L: '1',
  B: '8',
};

const CASTABLE_CHAR = {
  O: 'W',
  I: 'X',
  L: 'Y',
  B: 'Z',
};

class Base32OTP {
  readonly digits: number;
  readonly outputDigits: number;

  constructor(digits = 6) {
    this.digits = digits;
    this.outputDigits = Number(Math.pow(10, digits) - 1).toString(32).length;
  }

  encode(rawCode: number | string) {
    if (
      typeof rawCode === 'string' &&
      (!/^\d+$/.test(rawCode) || rawCode.length > this.digits)
    )
      throw new Error('Invalid code passed');

    let code = Number(rawCode).toString(32).toUpperCase();

    Object.keys(CASTABLE_CHAR).forEach(function (badLetter) {
      code = code.replace(
        new RegExp(badLetter, 'g'),

        CASTABLE_CHAR[<keyof typeof CASTABLE_CHAR>badLetter],
      );
    });

    const template = Array.from({length: this.outputDigits}, function () {
      return '0';
    });

    return Object.assign(template, code.split('').reverse()).reverse().join('');
  }

  decode(rawCode: string) {
    if (
      /^\d+$/.test(rawCode) &&
      rawCode.length === this.digits &&
      rawCode.length !== this.outputDigits
    )
      return rawCode;

    if (!/^[\dA-Za-z]+$/.test(rawCode) || rawCode.length !== this.outputDigits)
      throw new Error(
        'Code should be ' + this.outputDigits + ' alphanumeric characters',
      );

    let code = rawCode.toUpperCase();

    Object.keys(SIMILAR_CHAR).forEach(function (badLetter) {
      code = code.replace(
        new RegExp(badLetter, 'g'),

        SIMILAR_CHAR[<keyof typeof SIMILAR_CHAR>badLetter],
      );
    });

    Object.keys(CASTABLE_CHAR).forEach(function (badLetter) {
      code = code.replace(
        new RegExp(CASTABLE_CHAR[<keyof typeof CASTABLE_CHAR>badLetter], 'g'),

        badLetter,
      );
    });

    const template = Array.from({length: this.digits}, () => '0');

    code = parseInt(code, 32).toString(10);

    return Object.assign(template, code.split('').reverse()).reverse().join('');
  }
}

export default Base32OTP;
