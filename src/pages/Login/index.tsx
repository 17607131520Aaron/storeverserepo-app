import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.style';

const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    account: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (key: 'account' | 'password', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!form.account.trim()) nextErrors.account = '请输入账号';
    if (!form.password) nextErrors.password = '请输入密码';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    // TODO: 接入真实登录接口
    console.log('登录请求', form);
  };

  const handleGoRegister = () => {
    // 跳转到注册页面
    navigation.navigate('Register' as never);
  };

  return (
    <LinearGradient
      colors={['#f5f7fb', '#e9f1ff', '#f5f7fb']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>欢迎登录，管理员</Text>
                <Text style={styles.subtitle}>请使用账号登录管理控制台</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Beta · 内部环境</Text>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Account Field */}
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.required}>*</Text>
                  <Text style={styles.label}>账号</Text>
                </View>
                <View style={[styles.inputContainer, errors.account && styles.inputContainerError]}>
                  <TextInput
                    style={styles.input}
                    placeholder='请输入账号'
                    placeholderTextColor='#9ca3af'
                    value={form.account}
                    onChangeText={(v) => updateField('account', v)}
                    autoCapitalize='none'
                    returnKeyType='next'
                    autoCorrect={false}
                  />
                </View>
                {errors.account && <Text style={styles.errorText}>{errors.account}</Text>}
              </View>

              {/* Password Field */}
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.required}>*</Text>
                  <Text style={styles.label}>密码</Text>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    styles.passwordContainer,
                    errors.password && styles.inputContainerError,
                  ]}
                >
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder='请输入密码'
                    placeholderTextColor='#9ca3af'
                    value={form.password}
                    onChangeText={(v) => updateField('password', v)}
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
                    returnKeyType='done'
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword((prev) => !prev)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.eyeText}>{showPassword ? '隐藏' : '显示'}</Text>
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Login Button */}
              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                  style={styles.loginBtnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginText}>登录系统</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>还没有账号？</Text>
                <TouchableOpacity onPress={handleGoRegister} activeOpacity={0.7}>
                  <Text style={styles.footerLink}>立即注册</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.footerSection}>
              <Text style={styles.hintText}>默认演示账号：admin / 任意密码</Text>
              <Text style={styles.copyrightText}>© 2026 某未知名系统</Text>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginPage;
