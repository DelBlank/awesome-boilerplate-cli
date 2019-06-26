/* eslint-disable no-shadow */
// 测试命令行
/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
jest.mock('package.json', () => ({ version: '0.1.0' }))

const mockVersion = jest.fn()
const mockUsage = jest.fn()
const mockCommand = jest.fn()
const mockParse = jest.fn()

jest.mock('commander', () => ({
  version: (...args) => {
    mockVersion(...args)

    return {
      usage: (...args) => {
        mockUsage(...args)

        return {
          command: (...args) => {
            mockCommand(...args)

            return {
              parse: (...args) => {
                mockParse(...args)
              }
            }
          }
        }
      }
    }
  }
}))

process.argv = []

describe('test abc', () => {
  it('should get commander', () => {
    require('bin/abc')

    expect(mockVersion).toBeCalledWith('0.1.0', '-v --version')
    expect(mockUsage).toBeCalledWith('<command> [options]')
    expect(mockCommand).toBeCalledWith('clone [template]', '克隆模板')
    expect(mockParse).toBeCalledWith([])
  })
})
