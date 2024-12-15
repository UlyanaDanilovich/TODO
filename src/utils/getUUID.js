import Chance from 'chance';

export const getUUID = () => {
  const chance = new Chance(Math.random);
  return chance.guid();
};
