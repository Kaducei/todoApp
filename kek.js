(function () {
  let ConvertNumber = (number) => (from) => (to) =>
    parseInt(number, from).toString(to);

  ConvertNumber.bin2oct = (number) => ConvertNumber(number)(2)(8);
  ConvertNumber.bin2dec = (number) => ConvertNumber(number)(2)(10);
  ConvertNumber.bin2hex = (number) => ConvertNumber(number)(2)(16);

  ConvertNumber.oct2bin = (number) => ConvertNumber(number)(8)(2);
  ConvertNumber.oct2dec = (number) => ConvertNumber(number)(8)(10);
  ConvertNumber.oct2hex = (number) => ConvertNumber(number)(8)(16);

  ConvertNumber.dec2bin = (number) => ConvertNumber(number)(10)(2);
  ConvertNumber.dec2oct = (number) => ConvertNumber(number)(10)(8);
  ConvertNumber.dec2hex = (number) => ConvertNumber(number)(10)(16);

  ConvertNumber.hex2bin = (number) => ConvertNumber(number)(16)(2);
  ConvertNumber.hex2oct = (number) => ConvertNumber(number)(16)(8);
  ConvertNumber.hex2dec = (number) => ConvertNumber(number)(16)(10);

  this.ConvertNumber = ConvertNumber;
})(this);
