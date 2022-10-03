import { APIGatewayProxyEvent } from "aws-lambda";
import { FindOneTokenService } from "../services";

export class FindOneTokenController {
  findOneTokenService: FindOneTokenService;

  constructor(findOneTokenService: FindOneTokenService) {
    this.findOneTokenService = findOneTokenService;
  }

  async exec(parameters: APIGatewayProxyEvent["pathParameters"]) {
    const token = await this.findOneTokenService.exec(parameters.id);

    if (!token) {
      return {
        body: JSON.stringify({
          error: `The element identified by ${parameters.id} is either not present or it has expired from the internal db`,
        }),
        statusCode: 404,
      };
    }

    return {
      body: JSON.stringify(token),
      statusCode: 200,
    };
  }
}
