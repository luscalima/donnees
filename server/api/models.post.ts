import { modelSchema } from "~/utils/formSchemas";
import { Model, Project } from "../database/entities";

const modelRepository = dataSource.getRepository(Model);
const projectRepository = dataSource.getRepository(Project);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = modelSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const project = await projectRepository.findOne({
    where: { id: result.data.projectId },
  });

  if (!project) {
    console.log("Project not found");
    return;
  }

  const model = await modelRepository.save({
    ...result.data,
    project,
  });

  return model;
});
