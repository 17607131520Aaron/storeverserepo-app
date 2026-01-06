import { StyleSheet } from 'react-native';

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

export default styles;
