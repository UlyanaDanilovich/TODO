import Chance from 'chance';
import { severityTypes } from '../constants/severityTypes';
import { gerRandomInteger } from './getRandomInteger';
import getFormattedDate from '../formatters/getFormattedDate';

const getTodo = () => {
  const chance = new Chance(Math.random);
  const arr = Object.values(severityTypes);

  return {
    id: chance.guid(),
    title: chance.word(),
    description: Math.random() < 0.5 ? chance.sentence() : '',
    severity: arr[gerRandomInteger(0, arr.length - 1)],
    createdAt: getFormattedDate(Date.now()),
    done: chance.bool(),
    hidden: false,
  };
};

export const getTodoList = (amount = 1000) => {
  return Array.from({ length: amount }, () => getTodo());
};
