import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { getSecretValue } from "../util";

export const handleSignup = async (event: { body: any }, client: CognitoIdentityProviderClient) => {
  const { username, password, email } = event.body;
  console.log("testteee")
  const secretHash = getSecretValue(
    username,
    process.env.COGNITO_CLIENT_ID as string,
    process.env.COGNITO_CLIENT_SECRET as string
  );
  const singupCommand = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecretHash: secretHash,
    Username: username,
    Password: password,
    UserAttributes: [
      // AttributeListType
      {
        // AttributeType
        Name: "email", // required
        Value: email,
      },
    ],
  });
  try {
    const response = await client.send(singupCommand)
    return {
      statusCode: 201,
      body: JSON.stringify(response),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
};
