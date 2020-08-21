export const LOAD_PLAYER = 'LOAD_PLAYER';

const loadPlayer = (name, hash, email) => ({
  type: LOAD_PLAYER,
  name,
  hash,
  email,
});

export default loadPlayer;
