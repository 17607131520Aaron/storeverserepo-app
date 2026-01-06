import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import colors from '~/common/colors';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    account: '', // 账号
    username: '', // 用户名
    phone: '', // 手机号
    password: '', // 密码
    confirmPassword: '', // 确认密码
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 验证手机号
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  // 验证密码强度
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.account.trim()) {
      newErrors.account = '请输入账号';
    }

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '请输入正确的手机号';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '密码长度至少6位';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理注册
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // TODO: 调用注册API
      console.log('注册信息:', formData);
      // 这里可以调用注册接口
      // await registerUser(formData);
    } catch (error) {
      console.error('注册失败:', error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // 清除该字段的错误信息
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>注册账号</Text>
          <Text style={styles.subtitle}>请填写以下信息完成注册</Text>

          {/* 账号输入 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>账号</Text>
            <TextInput
              style={[styles.input, errors.account && styles.inputError]}
              placeholder="请输入账号"
              placeholderTextColor={colors.textSecondary}
              value={formData.account}
              onChangeText={(text) => updateFormData('account', text)}
              autoCapitalize="none"
            />
            {errors.account && <Text style={styles.errorText}>{errors.account}</Text>}
          </View>

          {/* 用户名输入 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>用户名</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="请输入用户名"
              placeholderTextColor={colors.textSecondary}
              value={formData.username}
              onChangeText={(text) => updateFormData('username', text)}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </View>

          {/* 手机号输入 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>手机号</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="请输入手机号"
              placeholderTextColor={colors.textSecondary}
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              keyboardType="phone-pad"
              maxLength={11}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* 密码输入 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>密码</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                placeholder="请输入密码（至少6位）"
                placeholderTextColor={colors.textSecondary}
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeText}>{showPassword ? '隐藏' : '显示'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* 确认密码输入 */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>确认密码</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="请再次输入密码"
                placeholderTextColor={colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(text) => updateFormData('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.eyeText}>{showConfirmPassword ? '隐藏' : '显示'}</Text>
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* 注册按钮 */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>注册</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeText: {
    fontSize: 14,
    color: colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
  registerButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
});

export default RegisterPage;

