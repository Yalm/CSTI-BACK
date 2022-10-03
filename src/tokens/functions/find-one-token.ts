import {
  Handler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import { connectToDatabase } from "../../common/database/mongodb";
import { FindOneTokenController } from "../controllers";
import { TokenRepository } from "../repositories/token.repository";
import { FindOneTokenService } from "../services";

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event) => {
  const { db } = await connectToDatabase();
  const tokenRepository = new TokenRepository(db);
  const findOneTokenService = new FindOneTokenService(tokenRepository);
  const findOneTokenController = new FindOneTokenController(
    findOneTokenService
  );

  return findOneTokenController.exec(event.pathParameters);
};
