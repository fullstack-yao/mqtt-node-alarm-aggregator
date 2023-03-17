import { initChildStatus, requirePubToParentTopic } from './alarmController.js';
import { childTopics } from './topics.js';

describe('Alarm aggregator logic tests', () => {
  const childStatus = {};
  const ChildTopic = childTopics[0];
  initChildStatus(childStatus);
  it('Should publish 0 to parent topic with receiving 0', () => {
    const result = requirePubToParentTopic(ChildTopic, '0', childStatus);
    expect(result).toBe(true);
    expect(childStatus.numOfNormal).toBe(childTopics.length - 1);
  });

  it('Should publish 1 to parent topic with receiving 1', () => {
    const result = requirePubToParentTopic(ChildTopic, '1', childStatus);
    expect(result).toBe(true);
    expect(childStatus.numOfNormal).toBe(childTopics.length);
  });

  it('Should publish 1 to parent topic with receiving 1', () => {
    childStatus[ChildTopic] = '0';
    childStatus['numOfNormal'] = childTopics.length - 1;

    const result = requirePubToParentTopic(ChildTopic, '1', childStatus);
    expect(result).toBe(true);
    expect(childStatus.numOfNormal).toBe(childTopics.length);
  });

  it('Should NOT publish to parent topic with receiving 1', () => {
    childStatus[ChildTopic] = '0';
    childStatus[childTopics[1]] = '0';
    childStatus['numOfNormal'] = childTopics.length - 2;

    const result = requirePubToParentTopic(ChildTopic, '1', childStatus);
    expect(result).toBe(false);
    expect(childStatus.numOfNormal).toBe(childTopics.length - 1);
  });
});
