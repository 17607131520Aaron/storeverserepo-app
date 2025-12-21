import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '~/theme';
import useAIAssistant from './useAIAssistant';
import { quickQuestions } from './constants';
import type { Message, AIAssistantProps } from './type';
import styles from './index.style';

const AIAssistant: React.FC<AIAssistantProps> = () => {
  const { theme } = useTheme();

  const {
    messages,
    inputText,
    isLoading,
    flatListRef,
    setInputText,
    handleSend,
    handleQuickQuestion,
  } = useAIAssistant();

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

export default AIAssistant;
