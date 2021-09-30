const u   = typeof navigator != 'undefined' ? navigator.userAgent : '';
const browser = {
  trident: u.indexOf('Trident') > -1,
  presto: u.indexOf('Presto') > -1,
  webKit: u.indexOf('AppleWebKit') > -1,
  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
  mobile: !!u.match(/AppleWebKit.*Mobile.*/),
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
  iPhone: u.indexOf('iPhone') > -1 ,
  iPad: u.indexOf('iPad') > -1,
  mathwallet: u.indexOf('MathWallet') > -1,
  mathwalletVer: u.indexOf('MathWallet') > -1?u.match(/MathWallet\/[^\s]+\s?/)[0].trim().split('/')[1]:'0' // MathWallet 版本
};

export default browser;