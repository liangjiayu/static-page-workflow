# static-page-workflow

​ 通过规范约定和一系列的`gulp`插件，给切图仔带来新创造力 🐶

## 项目定位

- 常用在活动页面、官网、品牌官网等等，这种页面技术栈为`jquery`和一些原生插件等，偏重点为`css`，可以理解为切图仔专用工作流。
- 技术栈为`vue`、`react`，前端可以独立部署等等，不适用该工作流
- 系统管理静态页面，并且打算使用`scss`、`es6`等技术

## 快速使用

```shell
# 安装依赖
$ npm i

# 开发
$ npm run start

# 打包
$ npm run build
```

## 设计理念

​ 通过观察`dist`文件可以知道，最后打包出来的文件只有`pages`、`assets`，本质就是`pages`的页面对`assets`的引用，和手动创建没有本质的区别，但是使用该工作流可以开箱就有`scss`、`es6`的能力。

### views

- 在`src`中的`views`编写`html`代码，支持模板编写，具体查看对应的[文档](https://www.npmjs.com/package/gulp-html-tpl)，编译后的代码在`pages`中
- 保存`public`会重新编译全部的`html`
- 关于的资源引用，需要引用`assets`文件夹中的对应的文件或者`cdn`。

### style

- 使用`sccc`编写样式，样式文件会直接生成在`assets=>css`
- 其中`mixins`文件夹会自动过滤，不会生成的文件

### script

- 支持`es6`的语法，文件会生成在`assets=>js`

### assets

- 其中`css`和`js`会特殊处理，其他的文件不会处理，直接迁移到`dist`中
- 图片和第三方插件，应该放在该文件中

## TODO

- CLI，一键下载模版
