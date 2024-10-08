import { CognitoIdentityProviderClient, InitiateAuthCommand, UserNotFoundException } from "@aws-sdk/client-cognito-identity-provider";
import { getSecretValue } from "../util";

export const handleLogin = async (event: { body: any }, client: CognitoIdentityProviderClient) => {
  const { username, password} = JSON.parse(event.body)

  const secretHash = getSecretValue(
    username,
    process.env.COGNITO_CLIENT_ID as string,
    process.env.COGNITO_CLIENT_SECRET as string
  );
  const initiateAuthCommand = new InitiateAuthCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });
  try {
    const response = await client.send(initiateAuthCommand)

    return {
      statusCode: 201,
      body: JSON.stringify(response),
    }
  } catch (error: any) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
};
