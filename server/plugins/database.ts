export default defineNitroPlugin(async () => {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
});
