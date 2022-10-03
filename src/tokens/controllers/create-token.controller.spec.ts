import { TokenRepository } from "../repositories/token.repository";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../common/database/mongodb";
import { CreateTokenController } from "./create-token.controller";
import { CreateTokenService } from "../services";

describe("CreateTokenController", () => {
  let tokenRepository: TokenRepository;
  let createTokenService: CreateTokenService;
  let createTokenController: CreateTokenController;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    const { client, db } = await connectToDatabase();
    mongoClient = client;
    tokenRepository = new TokenRepository(db);
    createTokenService = new CreateTokenService(tokenRepository);
    createTokenController = new CreateTokenController(createTokenService);
  });

  afterAll(async () => {
    await mongoClient?.close();
  });

  it("should return 400 due to validation error in year", async () => {
    const mockToken = {
      expiration_year: "2029",
    };
    const { statusCode } = await createTokenController.exec(
      JSON.stringify(mockToken)
    );
    expect(statusCode).toBe(400);
  });

  it("should return 400 due to validation error in email", async () => {
    const mockToken = {
      email: "renzo@yopmail.com",
    };
    const { statusCode } = await createTokenController.exec(
      JSON.stringify(mockToken)
    );
    expect(statusCode).toBe(400);
  });

  it("should return the id with 16 characters", async () => {
    const mockToken = {
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
    };
    const { body, statusCode } = await createTokenController.exec(
      JSON.stringify(mockToken)
    );
    expect(body.length).toBe(16);
    expect(statusCode).toBe(201);
  });

  it("should be defined", () => {
    expect(createTokenController).toBeDefined();
  });
});
