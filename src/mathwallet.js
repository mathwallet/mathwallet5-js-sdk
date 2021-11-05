import { postMessage , PostMessageSubscribe} from './util/PostMessage';

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

// nodejs
export default mathwallet;