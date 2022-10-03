import { APIGatewayProxyEvent } from "aws-lambda";
import { CreateTokenService } from "../services/create-token.service";
import { CreateTokenDto, createTokenSchema } from "../dtos/create-token.dto";

export class CreateTokenController {
  createTokenService: CreateTokenService;

  constructor(createTokenService: CreateTokenService) {
    this.createTokenService = createTokenService;
  }

  async exec(body: APIGatewayProxyEvent["body"]) {
    let dto: CreateTokenDto = null;
    try {
      dto = await createTokenSchema.validate(body);
    } catch (error) {
      return {
        body: JSON.stringify({ errors: error.errors }),
        statusCode: 400,
      };
    }

    const token = await this.createTokenService.exec(dto);

    return {
      body: token,
      statusCode: 201,
    };
  }
}
