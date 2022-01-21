# RM子程序React开发模版

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Name命名标准
App name命名标准应为以`rm-*`来命名，必须以字母开头，且不可以带有除中划线和下划线外的特殊符号。

## 可运行指令

### `npm start`
项目启动

### `npm run build`
项目构建, 输出文件夹一般为 `build/rm-script-editor`

## Webpack配置
可在项目的`.cracorc.js`进行修改, 注意子应用需要支持跨域, 在devServer中设置headers支持跨域

## 备注

### `rm-lib` 为git submodule的开发通用库，git地址为: `http://rm-dev.local/rliao1992/rm-lib`。里面包含了MotorMaster Api, 设备连接, runtime连接等常用组件。

