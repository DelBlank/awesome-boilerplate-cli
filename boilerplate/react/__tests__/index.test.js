import entry from 'index'

describe('test src entry', () => {
  it('should get right entry', () => {
    expect(entry()).toBe(`this is source code entry`)
  })
})
