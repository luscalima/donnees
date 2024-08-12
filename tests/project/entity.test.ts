import { Project } from '~/server/entities'

describe('Project', () => {
  it('should create a project', () => {
    const sut = new Project({
      id: 'id',
      name: 'name',
      description: 'description',
    })

    expect(sut).toBeInstanceOf(Project)
    expect(sut.id).toBe('id')
    expect(sut.name).toBe('name')
    expect(sut.description).toBe('description')
  })

  it('should create a project without description', () => {
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    expect(sut).toBeInstanceOf(Project)
    expect(sut.description).toBeUndefined()
  })

  it('should setup a valid name', () => {
    const otherName = 'other name'
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    sut.name = otherName

    expect(sut.name).toBe(otherName)
  })

  it('should throw an error when name is too short', () => {
    const name = 'na'
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    const creationAct = () =>
      new Project({
        id: 'id',
        name,
      })
    const attributeAct = () => {
      sut.name = name
    }

    const error = 'Name must be at least 3 characters long'
    expect(creationAct).toThrowError(error)
    expect(attributeAct).toThrowError(error)
  })

  it('should set valid props', () => {
    const sut = new Project({
      id: 'id',
      name: 'name',
    })

    sut.description = 'other description'

    expect(sut.description).toBe('other description')
  })
})
