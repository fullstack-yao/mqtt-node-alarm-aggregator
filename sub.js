import mqtt from 'mqtt';
import { BROKER_URL } from './config.js';
import { childTopics, parentTopic } from './topics.js';
import { initChildStatus, requirePubToParentTopic } from './alarmController.js';

const client = mqtt.connect(BROKER_URL);

const childStatus = initChildStatus();

client.on('connect', () => {
  childTopics.forEach((childTopic) => {
    client.subscribe(childTopic, (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Subscribed the child topic ${childTopic} - successfully`);
      }
    });
  });
});

client.on('message', (topic, message) => {
  const messageStr = message.toString();
  console.log(`Receive ${messageStr} from the child topic - ${topic}`);
  if (requirePubToParentTopic(topic, messageStr, childStatus)) {
    console.log(childStatus);
    console.log(`Publish ${messageStr} to the parent topic - ${parentTopic}`);
    client.publish(parentTopic, messageStr);
  }
});

client.on('error', (err) => {
  console.log(`Error: ${err}`);
  process.exit(1);
});
