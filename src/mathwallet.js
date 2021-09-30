import { postMessage , PostMessageSubscribe} from './util/PostMessage';

class MathWallet {
  isMathWallet() {
    return postMessage.isMathWallet;
  }

  openUrl(url) {
    return postMessage.send('openURL', {url});
  }

  openThirdApp(url) {
    return postMessage.send('openThirdApplication', {url});
  }

  getAppInfo() {
    return postMessage.send('getAppInfo');
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

// nodejs
export default mathwallet;