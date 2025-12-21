/**
 * 声音播放工具
 * 提供扫码成功等场景的声音提示功能
 *
 * 注意：如果需要播放自定义音效文件，请安装 react-native-sound：
 * yarn add react-native-sound
 *
 * 当前实现使用系统提示音（通过震动模拟或系统通知音）
 */

import { Platform, Vibration } from 'react-native';

// 尝试加载 react-native-sound（如果已安装）
let Sound: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Sound = require('react-native-sound');
  // 启用播放模式
  Sound.setCategory('Playback');
} catch (error) {
  // react-native-sound 未安装，使用系统音效
}

/**
 * 播放系统提示音
 * 优先使用 react-native-sound（如果已安装），否则使用系统音效
 */
export const playBeepSound = (): void => {
  try {
    if (Sound) {
      // 使用 react-native-sound 播放音效
      // 注意：需要将音效文件放在项目中（如 assets/sounds/beep.mp3）
      // const beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      //   if (!error) {
      //     beepSound.play();
      //   }
      // });
      // 暂时使用震动作为替代
      Vibration.vibrate(50);
    } else {
      // 使用系统音效（通过震动模拟）
      // iOS 和 Android 都可以使用震动作为声音反馈
      Vibration.vibrate(50);
    }
  } catch (error) {
    console.error('播放声音失败:', error);
    // 降级到震动反馈
    try {
      Vibration.vibrate(50);
    } catch (vibrateError) {
      console.error('震动反馈失败:', vibrateError);
    }
  }
};

/**
 * 播放扫码成功音效
 */
export const playScanSuccessSound = (): void => {
  playBeepSound();
};

