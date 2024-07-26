import { Project } from '~/server/entities'

describe('Project', () => {
  it('should create a project', () => {
    // given
    const sut = new Project({
      id: 'id',
      name: 'name',
      description: 'description',
    })

    // then
    expect(sut).toBeInstanceOf(Project)
    expect(sut.id).toBe('id')
    expect(sut.name).toBe('name')
    expect(sut.description).toBe('description')
  })

  it('should create a project without description', () => {
    // given
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    // then
    expect(sut).toBeInstanceOf(Project)
    expect(sut.description).toBeUndefined()
  })

  it('should throw an error when name is too short', () => {
    // given
    const name = 'na'
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    // when
    const creationAct = () =>
      new Project({
        id: 'id',
        name,
      })
    const attributeAct = () => {
      sut.name = name
    }

    // then
    const error = 'Name must be at least 3 characters long'
    expect(creationAct).toThrowError(error)
    expect(attributeAct).toThrowError(error)
  })
})
