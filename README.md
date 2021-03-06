# mathwalelt5-js-sdk
Javascript SDK for MathWallet5

## Installation
#### npm
Install
```shell
npm install mathwallet5-js-sdk
```
Require module
```javascript
var mathwallet = require('mathwallet5-js-sdk);
```

#### html
Drop the `dist/mathwallet.min.js` bundle into your html project
```html
<script src="path/to/mathwallet.min.js"></script>
```
Get instance
```javascript
var mathwallet = window.mathwallet;
```

## Usage

### Note
<font color=#C71585>注意: 此SDK需要在麦子钱包的DAPP浏览器中使用</font>  
<font color=#C71585>Note: The SDK needs to be used in the MathWallet DAPP Browser.</font>

### Common
适用于麦子钱包DAPP浏览器的通用方法  
Common method for MathWallet DAPP Browser

#### isMath
```javascript
mathwallet.isMathWallet();
```
Return
```javascript
true
```

#### getAppInfo
获取用户麦子钱包信息

Get user MathWallet info
```javascript
mathwallet.getAppInfo().then(console.log);
```
Return
```javascript
{
  "name": "MathWallet5",
  "client": "iOS",
  "version": "1.0.0",
  "deviceId": "2FB1AD00-20C7-45FF-AE94-A2F30A02F8F6"
  "language": "en",
}
```

#### getCurrentWallet
获取用户当前钱包信息

Get user current wallet info
```javascript
mathwallet.getCurrentWallet().then(console.log);
```
Return
```javascript
{
  "chainType":"EVM",   
  "chainId":"1",
  "name":"ETH-01",
  "address":"0x000000000000000000000000000000"
}
```

#### walletPicker
从当前链所有钱包中，选出要授权的钱包

Get user wallet info
```javascript
mathwallet.walletPicker().then(console.log);
```
Return
```javascript
{
  "chainType":"EVM",   
  "chainId":"1",
  "name":"ETH-01",
  "address":"0x000000000000000000000000000000"
}
```

### Download Math Wallet 麦子钱包下载

[https://mathwallet.org](https://mathwallet.org/)  

如果您希望将您开发的DAPP加入麦子钱包，请通过邮箱联系我们 labs@mathwallet.org 
  
If you would like to list your DAPP in Math Wallet, please send your DAPP information to labs@mathwallet.org
