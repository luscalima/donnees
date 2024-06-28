import { Project } from "@/server/database/entities";

const projectRepository = dataSource.getRepository(Project);

// TODO: handle errors

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const project = await projectRepository.findOne({
    where: {
      id,
    },
  });

  return project;
});
