import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { connectToDatabase } from "../../common/database/mongodb";
import { CreateTokenController } from "../controllers";
import { TokenRepository } from "../repositories/token.repository";
import { CreateTokenService } from "../services";

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event) => {
  const { db } = await connectToDatabase();
  const tokenRepository = new TokenRepository(db);
  const createTokenService = new CreateTokenService(tokenRepository);
  const createTokenController = new CreateTokenController(createTokenService);

  return createTokenController.exec(event.body);
};
