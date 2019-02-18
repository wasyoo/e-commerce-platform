export default (error) => {
  const message = error.message.replace('GraphQL error: ', '');
  return message;
};
