import mqtt from "mqtt";
import { FAILED_MESSAGE, NORMAL_MESSAGE, BROKER_URL } from "./config.js";
import { childTopics } from "./topics.js";

const PUB_INTERVAL = 3000;
const FAILURE_PERCENTAGE = 20;

const getRandomChildTopic = () => {
  const index = Math.floor(Math.random() * childTopics.length);
  return childTopics[index];
};

const getRandomMessage = () => {
  if (Math.random() * 100 < FAILURE_PERCENTAGE) {
    return FAILED_MESSAGE;
  } else {
    return NORMAL_MESSAGE;
  }
};

const client = mqtt.connect(BROKER_URL);
client.on("connect", () => {
  setInterval(() => {
    const randomChildTopic = getRandomChildTopic();
    const randomMessage = getRandomMessage();
    console.log(`Publish ${randomMessage} to ${randomChildTopic}`);
    client.publish(randomChildTopic, randomMessage);
  }, PUB_INTERVAL);
});

client.on("error", (err) => {
  console.log(`Error: ${err}`);
  process.exit(1);
});
