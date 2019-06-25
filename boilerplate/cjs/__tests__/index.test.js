describe('test src/index.js', () => {
  it('should get right exports', () => {
    const entry = require('index.js')
    expect(entry()).toBe(`this file is source code entry`)
  })
})
