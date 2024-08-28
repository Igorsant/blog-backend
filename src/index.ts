import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> => {
    // Your code logic here
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda!',
        }),
    };
};
