import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (_event: APIGatewayEvent | {}, _context: Context | {}, _callback: Callback<APIGatewayProxyResult> | {}): Promise<APIGatewayProxyResult> => {
    // Your code logic here
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
        }),
    };
};
