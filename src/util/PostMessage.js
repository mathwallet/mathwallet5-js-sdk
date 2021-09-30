import browser from './Browser';

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
    messageHandler.postMessage(JSON.stringify(message))
  });
};

export const PostMessageSubscribe = (callbackId, error, result) => {
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
    this.isMathWallet = browser.mathwallet
    if(browser.mathwallet && browser.android) {
      this.postMessageHandler = window.mathwallet;
    }else if(browser.mathwallet && browser.iPhone && typeof window.webkit != 'undefined'){
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

export const postMessage = new PostMessage(browser);