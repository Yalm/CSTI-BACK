import { APIGatewayAuthorizerResult } from "aws-lambda";
import { handler } from "./authorizer";

describe("TokenAuthorizerHandler", () => {
  it("should return deny when sending the empty token", async () => {
    const result = (await handler(
      { type: "TOKEN", methodArn: "arn:2", authorizationToken: "" },
      null,
      null
    )) as APIGatewayAuthorizerResult;
    expect(result.policyDocument.Statement[0].Effect).toBe("Deny");
  });

  it("should return allow when sending the token", async () => {
    const result = (await handler(
      {
        type: "TOKEN",
        methodArn: "arn:2",
        authorizationToken: "Bearer sk_live_UTCQSGcXW8bCyU59",
      },
      null,
      null
    )) as APIGatewayAuthorizerResult;
    expect(result.policyDocument.Statement[0].Effect).toBe("Allow");
  });
});
