import { CreateTokenService } from "./create-token.service";
import { TokenRepository } from "../repositories/token.repository";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../common/database/mongodb";

describe("CreateTokenService", () => {
  let tokenRepository: TokenRepository;
  let createTokenService: CreateTokenService;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    const { client, db } = await connectToDatabase();
    mongoClient = client;
    tokenRepository = new TokenRepository(db);
    createTokenService = new CreateTokenService(tokenRepository);
  });

  afterAll(async () => {
    await mongoClient?.close();
  });

  it("should return the id with 16 characters", async () => {
    const mockToken = {
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
    };
    const id = await createTokenService.exec(mockToken);
    expect(id.length).toBe(16);
  });

  it("should be defined", () => {
    expect(createTokenService).toBeDefined();
  });
});
