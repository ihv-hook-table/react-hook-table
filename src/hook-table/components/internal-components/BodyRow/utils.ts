export const getActionIdentifier = (action?: boolean | string) => {
  if (typeof action === 'string') {
    return action;
  }

  return action ? 'default' : undefined;
};
