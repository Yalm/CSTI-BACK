import { TokenRepository } from "../repositories/token.repository";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "../../common/database/mongodb";
import { FindOneTokenService } from "../services";
import { FindOneTokenController } from "./find-one-token.controller";

describe("FindOneTokenController", () => {
  let tokenRepository: TokenRepository;
  let findOneTokenService: FindOneTokenService;
  let mongoClient: MongoClient;
  let findOneTokenController: FindOneTokenController;

  beforeAll(async () => {
    const { client, db } = await connectToDatabase();
    mongoClient = client;
    tokenRepository = new TokenRepository(db);
    findOneTokenService = new FindOneTokenService(tokenRepository);
    findOneTokenController = new FindOneTokenController(findOneTokenService);
  });

  afterAll(async () => {
    await mongoClient?.close();
  });

  it("should return 404 when not finding the token", async () => {
    const id = "asdasd232";
    const { body, statusCode } = await findOneTokenController.exec({
      id,
    });
    expect(body).toEqual(
      JSON.stringify({
        error: `The element identified by ${id} is either not present or it has expired from the internal db`,
      })
    );
    expect(statusCode).toBe(404);
  });

  it("should return the token without the cvv", async () => {
    const mockToken = {
      _id: "id265",
      card_number: "4111111111111111",
      cvv: "123",
      expiration_month: "09",
      expiration_year: "2027",
      email: "ichard@gmail.com",
      created_at: new Date(),
    };
    await tokenRepository.create(mockToken);
    const { body, statusCode } = await findOneTokenController.exec({
      id: mockToken._id,
    });
    delete mockToken.cvv;
    expect(body).toEqual(JSON.stringify(mockToken));
    expect(statusCode).toBe(200);
  });

  it("should be defined", () => {
    expect(findOneTokenController).toBeDefined();
  });
});
