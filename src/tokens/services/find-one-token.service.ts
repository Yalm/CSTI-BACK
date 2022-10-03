import { TokenRepository } from "../repositories/token.repository";

export class FindOneTokenService {
  tokenRepository: TokenRepository;

  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  exec(id: string) {
    return this.tokenRepository.findById(id, {
      cvv: 0,
    });
  }
}
