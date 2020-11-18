import { EggPlugin } from 'egg';
//跨域配置
const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

export default plugin;
