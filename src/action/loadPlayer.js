export const LOAD_PLAYER = 'LOAD_PLAYER';

const loadPlayer = (name, profilePicture) => ({
  type: LOAD_PLAYER,
  name,
  profilePicture,
});

export default loadPlayer;
