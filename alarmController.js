import { FAILED_MESSAGE, NORMAL_MESSAGE } from './config.js';
import { childTopics } from './topics.js';

export const initChildStatus = (childStatus) => {
  childTopics.forEach((childTopic) => {
    childStatus[childTopic] = NORMAL_MESSAGE;
  });
  childStatus['numOfNormal'] = 6;
};

export const requirePubToParentTopic = (topic, messageStr, childStatus) => {
  if (messageStr === FAILED_MESSAGE) {
    if (childStatus[topic] === NORMAL_MESSAGE) {
      childStatus['numOfNormal'] -= 1;
    }
    childStatus[topic] = messageStr;
    return true;
  } else {
    // childStatus[topic] can be undefined or failedMessage
    if (childStatus[topic] !== messageStr) {
      childStatus['numOfNormal'] += 1;
    }
    childStatus[topic] = messageStr;
    if (childStatus['numOfNormal'] === childTopics.length) {
      return true;
    }
  }
  return false;
};
