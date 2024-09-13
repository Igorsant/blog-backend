import { Context, Callback, APIGatewayProxyResult } from "aws-lambda";
import { handleSignup } from "./signup";
import { handleLogin } from "./login";
import { handleConfirmSignup } from "./confirmSignUp";

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

  if (event.rawPath == "/confirm" && event.routeKey.startsWith("POST")) {
    return await handleConfirmSignup(event);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: event,
    }),
  };
};

// const eventMock = {
//   routeKey: "POST ",
//   rawPath: "/login",
//   body: {
//     username: "igor",
//     password: "Ig123...",
//   },
// };

// handler(eventMock, null, null).then(data => console.log(data))
