/**
 * react-native-vector-icons 类型声明文件
 */

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { StyleProp, TextProps, TextStyle } from 'react-native';

  /**
   * MaterialCommunityIcons 图标组件的属性
   */
  export interface MaterialCommunityIconsProps extends TextProps {
    /** 图标名称 */
    name: string;
    /** 图标大小，默认 12 */
    size?: number;
    /** 图标颜色 */
    color?: string;
    /** 自定义样式 */
    style?: StyleProp<TextStyle>;
  }

  /**
   * MaterialCommunityIcons 图标组件类
   */
  class MaterialCommunityIcons extends Component<MaterialCommunityIconsProps> {
    static Button: Component<any>;
    static getImageSource(name: string, size?: number, color?: string): Promise<any>;
    static getImageSourceSync(name: string, size?: number, color?: string): any;
  }

  export default MaterialCommunityIcons;
}
