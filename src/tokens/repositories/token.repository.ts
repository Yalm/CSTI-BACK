import { Db } from "mongodb";
import { Token } from "../entities/token.entity";

export class TokenRepository {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  private get collection() {
    return this.db.collection<Token>("tokens");
  }

  findById(id: string, projection?: Record<string, number>) {
    return this.collection.findOne({ _id: id }, { projection: projection });
  }

  create(doc: Token) {
    return this.collection.insertOne(doc);
  }
}
