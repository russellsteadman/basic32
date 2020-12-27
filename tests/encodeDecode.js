const Basic32 = require('../dist/Basic32');

const six = new Basic32.default(6);

for (let i = 0; i < 999999; i++) {
  try {
    if (Number(six.decode(six.encode(i))) !== i) {
      console.error(
        `Test failed on ${i}`,
        six.encode(i),
        six.decode(six.encode(i)),
      );
      break;
    }
  } catch (err) {
    console.error(err);
    console.error(`Test failed on ${i}`);
    break;
  }
}
