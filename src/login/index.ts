export const handleLogin = async (event: { body: any }) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Login",
    }),
  }
};
