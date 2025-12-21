import { useState, useRef, useCallback, useEffect } from 'react';
import type { Message } from './type';
import { FlatList } from 'react-native';

const useAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是AI助手，有什么可以帮助你的吗？',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // 模拟AI回复
  const simulateAIResponse = useCallback((userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 这里可以替换为真实的AI API调用
        const responses = [
          `我理解您的问题："${userMessage}"。让我为您详细解答...`,
          `关于"${userMessage}"，我的建议是：首先需要明确问题的核心，然后逐步分析解决方案。`,
          `这是一个很好的问题。针对"${userMessage}"，我认为可以从以下几个方面来考虑：1. 分析问题的本质 2. 寻找最佳实践 3. 实施解决方案`,
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1500); // 模拟网络延迟
    });
  }, []);

  // 发送消息
  const handleSend = useCallback(async () => {
    const trimmedText = inputText.trim();
    if (!trimmedText || isLoading) {
      return;
    }

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 获取AI回复
      const aiResponse = await simulateAIResponse(trimmedText);

      // 添加AI回复
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI回复错误:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我遇到了一些问题，请稍后再试。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, simulateAIResponse]);

  // 点击快捷问题
  const handleQuickQuestion = useCallback((question: string) => {
    setInputText(question);
  }, []);
  return {
    messages,
    inputText,
    isLoading,
    flatListRef,
    setMessages,
    setInputText,
    setIsLoading,
    handleSend,
    handleQuickQuestion,
  };
};

export default useAIAssistant;
