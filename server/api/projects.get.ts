import { Project } from "../database/entities";

const projectRepository = dataSource.getRepository(Project);

export default defineEventHandler(async (event) => {
  const projects = await projectRepository.find();
  return projects;
});
