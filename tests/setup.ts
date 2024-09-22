// @ts-expect-error just for test
global.useStorage = () => ({
  getItem: vi.fn().mockReturnValue(null),
})
