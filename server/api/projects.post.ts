import { projectSchema } from "~/utils/formSchemas";
import { Project } from "../database/entities";

const projectRepository = dataSource.getRepository(Project);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = projectSchema.safeParse(body);

  if (!result.success) {
    console.log(result.error);
    return;
  }

  const project = await projectRepository.save(result.data);

  return project;
});
