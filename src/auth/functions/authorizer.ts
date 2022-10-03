import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";

const generatePolicy = (
  resource: string,
  deny = true
): APIGatewayAuthorizerResult => {
  return {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: deny ? "Deny" : "Allow",
          Resource: resource,
        },
      ],
    },
  };
};

export const handler: APIGatewayTokenAuthorizerHandler = async (event) => {
  let token = "";

  if (event.authorizationToken) {
    token = event.authorizationToken.split(" ")[1];
  }

  if (!token) {
    return generatePolicy(event.methodArn);
  }

  return generatePolicy(event.methodArn, !token.match(/^sk_(test|live)_/));
};
