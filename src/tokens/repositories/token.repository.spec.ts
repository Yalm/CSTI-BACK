import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../common/database/mongodb";
import { TokenRepository } from "./token.repository";

describe("TokenRepository", () => {
  let tokenRepository: TokenRepository;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    const { client, db } = await connectToDatabase();
    mongoClient = client;
    tokenRepository = new TokenRepository(db);
  });

  afterAll(async () => {
    await mongoClient?.close();
  });

  it("should insert a doc into collection", async () => {
    const mockToken = {
      _id: "id98777",
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
      created_at: new Date(),
    };
    await tokenRepository.create(mockToken);

    const insertedToken = await tokenRepository.findById(mockToken._id);
    expect(insertedToken).toEqual(mockToken);
  });

  it("should return only the selected fields", async () => {
    const mockToken = {
      _id: "id29823",
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
      created_at: new Date(),
    };
    await tokenRepository.create(mockToken);
    const insertedToken = await tokenRepository.findById(mockToken._id, {
      email: 1,
    });
    expect(insertedToken).toEqual({
      _id: mockToken._id,
      email: mockToken.email,
    });
  });

  it("should be defined", () => {
    expect(tokenRepository).toBeDefined();
  });
});
