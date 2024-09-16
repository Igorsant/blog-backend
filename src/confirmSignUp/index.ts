import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { getSecretValue } from "../util";

export const handleConfirmSignup = async (event: { body: any }, client: CognitoIdentityProviderClient) => {
  const { username, code } = JSON.parse(event.body);

  const secretHash = getSecretValue(
    username,
    process.env.COGNITO_CLIENT_ID as string,
    process.env.COGNITO_CLIENT_SECRET as string
  );

  const confirmSignUpCommand = new ConfirmSignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: secretHash,
    Username: username,
    ConfirmationCode: code,
  });
  try {
    const response = await client.send(confirmSignUpCommand)

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
