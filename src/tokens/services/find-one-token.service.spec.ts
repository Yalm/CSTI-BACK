import { TokenRepository } from "../repositories/token.repository";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../common/database/mongodb";
import { FindOneTokenService } from "./find-one-token.service";

describe("FindOneTokenService", () => {
  let tokenRepository: TokenRepository;
  let findOneTokenService: FindOneTokenService;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    const { client, db } = await connectToDatabase();
    mongoClient = client;
    tokenRepository = new TokenRepository(db);
    findOneTokenService = new FindOneTokenService(tokenRepository);
  });

  afterAll(async () => {
    await mongoClient?.close();
  });

  it("should return the token without the cvv", async () => {
    const mockToken = {
      _id: "id2",
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
      created_at: new Date(),
    };
    await tokenRepository.create(mockToken);
    const insertedToken = await findOneTokenService.exec(mockToken._id);
    delete mockToken.cvv;
    expect(insertedToken).toEqual(mockToken);
  });

  it("should be defined", () => {
    expect(findOneTokenService).toBeDefined();
  });
});
