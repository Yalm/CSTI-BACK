import { CreateTokenDto } from "../dtos/create-token.dto";
import { TokenRepository } from "../repositories/token.repository";

export class CreateTokenService {
  tokenRepository: TokenRepository;

  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  private generateId() {
    return Buffer.from(Date.now().toString()).toString("base64").slice(0, 16);
  }

  async exec(doc: CreateTokenDto) {
    const id = this.generateId();
    await this.tokenRepository.create({
      ...doc,
      created_at: new Date(),
      _id: id,
    });
    return id;
  }
}
