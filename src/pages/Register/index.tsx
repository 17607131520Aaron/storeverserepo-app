import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterPage: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    account: '', // 账号
    username: '', // 用户名
    email: '', // 邮箱（可选）
    phone: '', // 手机号（可选）
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

  // 验证邮箱
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = '请输入正确的手机号';
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = '请输入正确的邮箱地址';
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

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleGoLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <LinearGradient
      colors={['#f5f7fb', '#e9f1ff', '#f5f7fb']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        enableOnAndroid
        extraScrollHeight={60}
        contentInsetAdjustmentBehavior='always'
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardTop}>
 
            <View style={styles.headerSection}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>创建账号</Text>
                <Text style={styles.subtitle}>请填写以下信息完成账号注册</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Beta · 内部环境</Text>
              </View>
            </View>


            <View style={styles.formSection}>

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
                    value={formData.account}
                    onChangeText={(v) => updateFormData('account', v)}
                    autoCapitalize='none'
                    returnKeyType='next'
                    autoCorrect={false}
                  />
                </View>
                {errors.account && <Text style={styles.errorText}>{errors.account}</Text>}
              </View>


              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.required}>*</Text>
                  <Text style={styles.label}>用户名</Text>
                </View>
                <View
                  style={[styles.inputContainer, errors.username && styles.inputContainerError]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder='请输入用户名'
                    placeholderTextColor='#9ca3af'
                    value={formData.username}
                    onChangeText={(v) => updateFormData('username', v)}
                    autoCapitalize='none'
                    returnKeyType='next'
                    autoCorrect={false}
                  />
                </View>
                {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
              </View>

   
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>邮箱（可选）</Text>
                </View>
                <View style={[styles.inputContainer, errors.email && styles.inputContainerError]}>
                  <TextInput
                    style={styles.input}
                    placeholder='请输入邮箱地址'
                    placeholderTextColor='#9ca3af'
                    value={formData.email}
                    onChangeText={(v) => updateFormData('email', v)}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

   
              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>手机号（可选）</Text>
                </View>
                <View style={[styles.inputContainer, errors.phone && styles.inputContainerError]}>
                  <TextInput
                    style={styles.input}
                    placeholder='请输入手机号'
                    placeholderTextColor='#9ca3af'
                    value={formData.phone}
                    onChangeText={(v) => updateFormData('phone', v)}
                    keyboardType='phone-pad'
                    maxLength={11}
                    returnKeyType='next'
                  />
                </View>
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
              </View>

    
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
                    placeholder='请输入密码（至少 6 位）'
                    placeholderTextColor='#9ca3af'
                    value={formData.password}
                    onChangeText={(v) => updateFormData('password', v)}
                    secureTextEntry={!showPassword}
                    autoCapitalize='none'
                    returnKeyType='next'
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


              <View style={styles.field}>
                <View style={styles.labelRow}>
                  <Text style={styles.required}>*</Text>
                  <Text style={styles.label}>确认密码</Text>
                </View>
                <View
                  style={[
                    styles.inputContainer,
                    styles.passwordContainer,
                    errors.confirmPassword && styles.inputContainerError,
                  ]}
                >
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder='请再次输入密码'
                    placeholderTextColor='#9ca3af'
                    value={formData.confirmPassword}
                    onChangeText={(v) => updateFormData('confirmPassword', v)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize='none'
                    returnKeyType='done'
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.eyeText}>{showConfirmPassword ? '隐藏' : '显示'}</Text>
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
          </View>


          <View style={styles.cardBottom}>
    
            <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} activeOpacity={0.8}>
              <LinearGradient
                colors={['#3b82f6', '#2563eb', '#1d4ed8']}
                style={styles.loginBtnGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginText}>注册账号</Text>
              </LinearGradient>
            </TouchableOpacity>


            <View style={styles.footerRow}>
              <Text style={styles.footerText}>已经有账号？</Text>
              <TouchableOpacity onPress={handleGoLogin} activeOpacity={0.7}>
                <Text style={styles.footerLink}>去登录</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingBottom: 80,
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#1f2937',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerSection: {
    marginBottom: 28,
  },
  cardTop: {
    paddingBottom: 12,
  },
  cardBottom: {
    paddingTop: 8,
  },
  headerContent: {
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    color: '#0f172a',
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1677ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  tagText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  formSection: {
    marginBottom: 20,
  },
  field: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  required: {
    color: '#f43f5e',
    marginRight: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    color: '#1f2937',
    fontSize: 15,
    fontWeight: '700',
  },
  inputContainer: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  inputContainerError: {
    borderColor: '#f87171',
    backgroundColor: '#fef2f2',
  },
  input: {
    flex: 1,
    color: '#0f172a',
    fontSize: 16,
    padding: 0,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 70,
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  eyeText: {
    color: '#1677ff',
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    color: '#e11d48',
    fontSize: 12,
    marginLeft: 4,
  },
  loginBtn: {
    borderRadius: 16,
    marginTop: 8,
    overflow: 'hidden',
    shadowColor: '#1677ff',
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  loginBtnGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footerText: {
    color: '#475569',
    fontSize: 14,
  },
  footerLink: {
    color: '#1677ff',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 6,
  },
  footerSection: {
    marginTop: 22,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  hintText: {
    color: '#64748b',
    fontSize: 12,
    marginBottom: 8,
  },
  copyrightText: {
    color: '#94a3b8',
    fontSize: 11,
  },
});

export default RegisterPage;
