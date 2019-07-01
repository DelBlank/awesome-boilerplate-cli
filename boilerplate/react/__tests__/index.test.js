import utils from 'utils'

describe('test src utils', () => {
  it('should get right utils', () => {
    expect(utils()).toBe(`this is source utils`)
  })
})
