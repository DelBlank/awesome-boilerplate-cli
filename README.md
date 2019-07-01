# awesome-boilerplate-cli

<img src="https://img.shields.io/badge/build-passing-green.svg">
<img src="https://img.shields.io/badge/coverage-100%25-blue.svg">

实用模板脚手架，方便用户快速搭建一个 npm 模块的开发环境。

支持的模板：

- cjs：适合使用 `commonjs` 模块的 npm 包开发
- es6：适合使用 `es6 module` 模块的 npm 包开发
- react：适合 `react ui` npm 包开发

## 安装方式

`$ npm install -g awesome-boilerplate-cli`

## 命令参数

| 参数             | 描述                                              |
| ---------------- | ------------------------------------------------- |
| -v, --version    | 显示工具的版本                                    |
| -h, --help       | 显示帮助信息                                      |
| clone [template] | 自动在项目根目录下生成 `cjs`，`es6`，`react` 模板 |

## 使用方式

```shell
$ abc clone cjs
$ abc clone es6
$ abc clone react
```

注意：

- `abc clone [template]` 命令生成的文件会覆盖项目中已存在的同名文件
