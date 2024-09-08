import { Context, Callback, APIGatewayProxyResult } from "aws-lambda";
import { handleSignup } from "./signup";
import { handleLogin } from "./login";

export const handler = async (
  event: { routeKey: string; rawPath: string; body: any },
  context: Context | null,
  callback: Callback<APIGatewayProxyResult> | null
): Promise<APIGatewayProxyResult> => {
  if (event.rawPath == "/") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello World!",
      }),
    };
  }

  if (event.rawPath == "/login" && event.routeKey.startsWith("POST")) {
    return await handleLogin(event);
  }
  if (event.rawPath == "/signup" && event.routeKey.startsWith("POST")) {
    return await handleSignup(event);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: event,
    }),
  };
};

const eventMock = {
  routeKey: "POST /signup",
  rawPath: "/signup",
  body: {
    username: "test",
    password: "password",
    email: "test",
  },
};

handler(eventMock, null, null);
