import AboutPage from '~/pages/About';
import HomePage from '~/pages/Home';
import LoginPage from '~/pages/Login';
import ScanExamplePage from '~/pages/ScanExample';
import AIAssistantPage from '~/pages/AIAssistant';

import MineHomePage from '~/pages/Mine';

const mineRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    options: {
      title: '登录',
      headerShown: true,
    },
  },
  {
    name: 'Home',
    component: HomePage,
    options: {
      title: '首页',
      headerShown: true,
    },
  },
  {
    name: 'ScanExample',
    component: ScanExamplePage,
    options: {
      title: '扫码入库',
      headerShown: true,
    },
  },
  {
    name: 'MineHome',
    component: MineHomePage,
    options: {
      title: '我的',
      headerShown: true,
    },
  },
  {
    name: 'About',
    component: AboutPage,
    options: {
      title: '关于',
      headerShown: true,
    },
  },
  {
    name: 'AIAssistant',
    component: AIAssistantPage,
    options: {
      title: 'AI助手',
      headerShown: true,
    },
  },
];

export default mineRoutes;
