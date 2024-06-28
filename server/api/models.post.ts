import { modelSchema } from "~/utils/formSchemas";
import { Model } from "../database/entities";

const projectRepository = dataSource.getRepository(Model);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = modelSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const model = await projectRepository.save(result.data);

  return model;
});
