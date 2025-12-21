import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { INavBarProps } from '~/components/NavigationBar';
import { useTheme } from '~/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIAssistantProps {
  navBar?: INavBarProps['navBar'];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ navBar }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
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

  // 快捷问题建议
  const quickQuestions = ['帮我写一段代码', '解释一下这个概念', '给我一些建议', '帮我分析这个问题'];

  // 初始化导航栏（仅在作为独立路由页面时）
  useEffect(() => {
    if (navBar) {
      navBar.setTitle('AI助手');
    }
  }, [navBar]);

  // 当消息更新时，滚动到底部
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

  // 渲染消息项
  const renderMessage = useCallback(
    ({ item }: { item: Message }) => {
      const isUser = item.role === 'user';

      return (
        <View
          style={[
            styles.messageContainer,
            isUser ? styles.userMessageContainer : styles.assistantMessageContainer,
          ]}
        >
          <View
            style={[
              styles.messageBubble,
              {
                backgroundColor: isUser ? theme.colors.primary : theme.colors.surface,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                {
                  color: isUser ? '#FFFFFF' : theme.colors.text,
                },
              ]}
            >
              {item.content}
            </Text>
          </View>
        </View>
      );
    },
    [theme],
  );

  // 渲染快捷问题
  const renderQuickQuestion = useCallback(
    (question: string, index: number) => {
      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.quickQuestionButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={() => handleQuickQuestion(question)}
        >
          <Text style={[styles.quickQuestionText, { color: theme.colors.text }]}>{question}</Text>
        </TouchableOpacity>
      );
    },
    [theme, handleQuickQuestion],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* 消息列表 */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                开始对话吧
              </Text>
            </View>
          }
        />

        {/* 快捷问题（仅在第一条消息时显示） */}
        {messages.length === 1 && (
          <View style={styles.quickQuestionsContainer}>
            {quickQuestions.map((question, index) => renderQuickQuestion(question, index))}
          </View>
        )}

        {/* 输入区域 */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.border,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              placeholder='输入您的问题...'
              placeholderTextColor={theme.colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isLoading}
              onSubmitEditing={handleSend}
              returnKeyType='send'
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  inputText.trim() && !isLoading ? theme.colors.primary : theme.colors.border,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size='small' color='#FFFFFF' />
            ) : (
              <Text style={styles.sendButtonText}>发送</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  assistantMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
  },
  quickQuestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  quickQuestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  quickQuestionText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 20,
    padding: 0,
  },
  sendButton: {
    width: 60,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AIAssistant;
