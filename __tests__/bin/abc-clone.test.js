// 测试克隆功能
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

const mockStart = jest.fn()
const mockSucceed = jest.fn()
const mockFail = jest.fn()

describe('test abc clone', () => {
  beforeEach(() => {
    process.argv = []
    process.exit = jest.fn()
    console.error = jest.fn()
    console.log = jest.fn()

    jest.mock('log-symbols', () => ({
      success: 0,
      error: 1
    }))

    jest.mock('chalk', () => ({
      green: jest.fn(msg => msg),
      red: jest.fn(msg => msg)
    }))

    jest.mock('ora', () =>
      jest.fn(() => ({
        start: mockStart,
        succeed: mockSucceed,
        fail: mockFail
      }))
    )
  })

  afterEach(() => {
    jest.resetModules()
  })

  it('should throw not specific error', () => {
    jest.mock('commander', () => ({
      parse: jest.fn(),
      args: []
    }))

    require('bin/abc-clone')

    expect(console.error).toBeCalledWith(1, 'abc: 请指定具体模板')
    expect(process.exit).toBeCalledWith(1)
  })

  it('should throw not found error', () => {
    jest.mock('commander', () => ({
      parse: jest.fn(),
      args: ['xxxxx']
    }))

    require('bin/abc-clone')

    expect(console.error).toBeCalledWith(1, 'abc: 未找到同名模板')
    expect(process.exit).toBeCalledWith(1)
  })

  it('should throw copy error', () => {
    jest.mock('commander', () => ({
      parse: jest.fn(),
      args: ['cjs']
    }))

    jest.mock('execa', () =>
      jest.fn(() => {
        throw new Error('copy error')
      })
    )

    const promise = require('bin/abc-clone')

    promise.then(() => {
      expect(mockStart).toBeCalled()
      expect(mockFail).toBeCalled()
      expect(console.error).toBeCalledWith(
        1,
        `abc: 模板拷贝出错
        copy error`
      )
    })
  })

  it('should clone boilerplate', () => {
    jest.mock('commander', () => ({
      parse: jest.fn(),
      args: ['cjs']
    }))

    jest.mock('execa', () => jest.fn())

    const promise = require('bin/abc-clone')

    promise.then(() => {
      expect(mockStart).toBeCalled()
      expect(mockSucceed).toBeCalled()
      expect(console.log).toBeCalledWith(0, 'abc: 模板拷贝成功')
    })
  })
})
