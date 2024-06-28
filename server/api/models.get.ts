import { Model } from "../database/entities";

const modelRepository = dataSource.getRepository(Model);

export default defineEventHandler(async (event) => {
  const models = await modelRepository.find();
  return models;
});
