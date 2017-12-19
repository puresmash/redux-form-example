
export const signIn = (payload) => {
  console.log(payload)
  return {
    type: 'TEST_SIGNIN_ACTION',
    payload
  };
}
