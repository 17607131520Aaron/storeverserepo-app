/**
 * @format
 */

import { AppRegistry } from 'react-native';

// import App from './App';
import { name as appName } from './app.json';
import App from './src/app';

// Reactotron 必须在其他导入之前初始化
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./src/config/reactotron');
}

AppRegistry.registerComponent(appName, () => App);
