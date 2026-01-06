import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '~/common/colors';

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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>欢迎回来，管理员</Text>
              <Text style={styles.subtitle}>使用账号登录进入管理控制台</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Beta · 内部环境</Text>
            </View>
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.label}>账号</Text>
            </View>
            <TextInput
              style={[styles.input, errors.account && styles.inputError]}
              placeholder='请输入账号'
              placeholderTextColor={colors.textSecondary}
              value={form.account}
              onChangeText={(v) => updateField('account', v)}
              autoCapitalize='none'
              returnKeyType='next'
            />
            {errors.account && <Text style={styles.errorText}>{errors.account}</Text>}
          </View>

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.required}>*</Text>
              <Text style={styles.label}>密码</Text>
            </View>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                placeholder='请输入密码'
                placeholderTextColor={colors.textSecondary}
                value={form.password}
                onChangeText={(v) => updateField('password', v)}
                secureTextEntry={!showPassword}
                autoCapitalize='none'
                returnKeyType='done'
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Text style={styles.eyeText}>{showPassword ? '隐藏' : '显示'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>登录系统</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>还没有账号？</Text>
            <TouchableOpacity onPress={handleGoRegister}>
              <Text style={styles.footerLink}>立即注册</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hintBox}>
            <Text style={styles.hintText}>默认演示账号：admin / 任意密码</Text>
            <Text style={styles.hintText}>© 2026 某未知名系统</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#1b1037',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#0f1021',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    color: colors.white,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    color: '#c8c9d3',
    fontSize: 14,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#4f3fb6',
    borderRadius: 12,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  field: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  required: {
    color: colors.error,
    marginRight: 4,
    fontSize: 14,
  },
  label: {
    color: '#e1e2eb',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2c3b',
    backgroundColor: '#14162b',
    paddingHorizontal: 14,
    color: colors.white,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  passwordRow: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeText: {
    color: colors.primary,
    fontSize: 14,
  },
  errorText: {
    marginTop: 6,
    color: colors.error,
    fontSize: 12,
  },
  loginBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0a65ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#c8c9d3',
    fontSize: 14,
  },
  footerLink: {
    color: '#0a65ff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  hintBox: {
    marginTop: 18,
    alignItems: 'center',
  },
  hintText: {
    color: '#8e90a2',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default LoginPage;
