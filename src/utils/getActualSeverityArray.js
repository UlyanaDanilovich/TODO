const getActualSeverityArray = (todos) => [
  ...new Set(todos.map(({ severity }) => severity)),
];

export default getActualSeverityArray;
