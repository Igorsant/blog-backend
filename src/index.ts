import { Context, Callback, APIGatewayProxyResult } from "aws-lambda";
import { handleSignup } from "./signup";
import { handleLogin } from "./login";
import { handleConfirmSignup } from "./confirmSignUp";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { handleConfirmForgotPassword } from "./confirmForgotPassword";
import { handleForgotPassword } from "./forgotPassword";

type Event = {
  routeKey: string;
  rawPath: string;
  body: any;
};

export const handler = async (
  event: Event,
  context: Context | null,
  callback: Callback<APIGatewayProxyResult> | null
): Promise<APIGatewayProxyResult> => {
  const client = new CognitoIdentityProviderClient({
    region: "us-east-1",
  });

  const routesResolvers: {
    [key: string]: (
      event: {
        body: any;
      },
      client: CognitoIdentityProviderClient
    ) => Promise<{
      statusCode: number;
      body: string;
    }>;
  } = {
    "/": (event, client) => Promise.resolve({
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello World!",
      }),
    }),
    "/login": handleLogin,
    "/signup": handleSignup,
    "/confirm": handleConfirmSignup,
    "/confirmForgotPassword": handleConfirmForgotPassword,
    "/forgotPassword": handleForgotPassword,
  };

  return await routesResolvers[event.rawPath](event, client);
};
