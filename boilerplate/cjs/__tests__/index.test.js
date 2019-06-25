const entry = require('index.js')

describe('test src/index.js', () => {
  it('should get right exports', () => {
    expect(entry()).toBe(`this file is source code entry`)
  })
})
