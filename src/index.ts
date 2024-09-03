import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: { routeKey: string, rawPath: string, body: {}}, context: Context, callback: Callback<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> => {

    if (event.rawPath == "/") {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello World!',
            }),
        };
    }
    if (event.rawPath == "/login" && event.routeKey.startsWith("POST")) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Login!',
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: event,
        }),
    };
};
