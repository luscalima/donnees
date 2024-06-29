import { modelQuerySchema } from "~/utils/formSchemas";
import { Model } from "../database/entities";

const modelRepository = dataSource.getRepository(Model);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const result = modelQuerySchema.safeParse(query);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const models = await modelRepository.find({
    where: { project: { id: result.data.projectId } },
  });
  return models;
});
