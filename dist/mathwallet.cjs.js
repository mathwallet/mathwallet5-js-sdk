'use strict';

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

let resolvers = [];
let callbackId = 0;

class PostMessageResolver {
  constructor(_id, _resolve, _reject) {
    this.id = _id;
    this.resolve = _resolve;
    this.reject = _reject;
  }
}

const PostMessageSend = (_method, _payload, messageHandler) => {
  return new Promise((resolve, reject) => {
    callbackId++;
    resolvers.push(new PostMessageResolver(`${callbackId}`, resolve, reject));

    let message = {
      id : `${callbackId}`,
      method : _method,
      params : _payload
    };
    messageHandler.postMessage(JSON.stringify(message));
  });
};

const PostMessageSubscribe = (callbackId, error, result) => {
  for (let i = 0; i < resolvers.length; i++) {
    if (resolvers[i].id === callbackId) {
      if (error) {
        resolvers[i].reject(new Error(error));
      } else {
        resolvers[i].resolve(result);
      }
      resolvers = resolvers.slice(i, 1);
    }
  }
};

class PostMessage {
  constructor() {
    this.isMathWallet = browser.mathwallet;
    if(browser.mathwallet && browser.android) {
      this.postMessageHandler = window.mathwallet5;
    }else if(browser.mathwallet && (browser.iPhone || browser.iPad) && typeof window.webkit != 'undefined'){
      this.postMessageHandler = window.webkit.messageHandlers.mathwallet;
    }else{
      this.postMessageHandler = {
        postMessage : console.log //debug
      };
    }
  }

  send(method, payload = {}) {
    return PostMessageSend(method, payload, this.postMessageHandler);
  }
}

const postMessage = new PostMessage(browser);

class MathWallet {
  isMathWallet() {
    return postMessage.isMathWallet;
  }

  getAppInfo() {
    return postMessage.send('getAppInfo');
  }

  getCurrentWallet() {
    return postMessage.send('getCurrentWallet');
  }

  walletPicker() {
    return postMessage.send('walletPicker');
  }
}

let mathwallet = new MathWallet();

// browsers
if(typeof window !== 'undefined'){
  window.mathwallet = mathwallet;
  window.mathwalletCallback = PostMessageSubscribe;
}

module.exports = mathwallet;
