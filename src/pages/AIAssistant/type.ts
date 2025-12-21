import type { INavBarProps } from '~/components/NavigationBar';
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AIAssistantProps {
  navBar?: INavBarProps['navBar'];
}
