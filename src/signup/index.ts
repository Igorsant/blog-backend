import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { getSecretValue } from "../util";

export const handleSignup = async (
  event: { body: any },
  client: CognitoIdentityProviderClient
) => {
  const requestBody = typeof event.body === "string" ? JSON.parse(event.body) : event.body
  const username = requestBody.username;
  const email = requestBody.email;
  const password = requestBody.password;
  console.log(username, email, password);

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
    const response = await client.send(singupCommand);
    console.log(response);
    return {
      statusCode: 201,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
