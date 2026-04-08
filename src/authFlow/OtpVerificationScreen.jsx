import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import AuthScreenShell from './components/AuthScreenShell';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const OtpVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS);
  const hiddenInputRef = useRef(null);
  const email = route?.params?.email?.trim() || 'your email address';

  const handleOtpChange = (value) => {
    const nextValue = value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setOtp(nextValue);
  };

  const focusHiddenInput = () => {
    hiddenInputRef.current?.focus();
  };

  const handleResend = () => {
    if (secondsRemaining > 0) {
      return;
    }

    setOtp('');
    setSecondsRemaining(RESEND_SECONDS);
    focusHiddenInput();
  };

  useEffect(() => {
    if (secondsRemaining === 0) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          clearInterval(intervalId);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

  const isComplete = otp.length === OTP_LENGTH;

  return (
    <AuthScreenShell>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={styles.safeContent}>
          <View style={styles.content}>
            <View style={styles.headingContainer}>
              <Text style={styles.eyebrow}>VERIFY YOUR ACCESS</Text>
              <Text style={styles.headline}>Enter the</Text>
              <Text style={styles.headline}>6-digit code</Text>
              <Text style={styles.headline}>we sent.</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>OTP Verification</Text>
              <Text style={styles.formCopy}>
                We sent a one-time code to <Text style={styles.formCopyStrong}>{email}</Text>
              </Text>

              <TouchableOpacity
                activeOpacity={1}
                onPress={focusHiddenInput}
                style={styles.otpRow}
              >
                {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                  const value = otp[index] || '';
                  const isActive = index === otp.length || (otp.length === OTP_LENGTH && index === OTP_LENGTH - 1);

                  return (
                    <View
                      key={`otp-digit-${index}`}
                      style={[styles.otpCell, isActive && styles.otpCellActive]}
                    >
                      <Text style={styles.otpDigit}>{value}</Text>
                    </View>
                  );
                })}
              </TouchableOpacity>

              <TextInput
                ref={hiddenInputRef}
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                maxLength={OTP_LENGTH}
                autoFocus
                style={styles.hiddenInput}
              />

              <TouchableOpacity
                style={[styles.primaryButton, !isComplete && styles.primaryButtonDisabled]}
                onPress={() => navigation.navigate('Home')}
                disabled={!isComplete}
              >
                <Text style={styles.primaryButtonText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.secondaryButtonText}>Back to details</Text>
              </TouchableOpacity>

              <View style={styles.resendRow}>
                <Text style={styles.resendText}>Didn't receive the code?</Text>
                <TouchableOpacity onPress={handleResend} disabled={secondsRemaining > 0}>
                  <Text style={[styles.resendAction, secondsRemaining > 0 && styles.resendActionMuted]}>
                    {secondsRemaining > 0 ? `Resend in 00:${String(secondsRemaining).padStart(2, '0')}` : 'Resend code'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </AuthScreenShell>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 24,
  },
  headingContainer: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#e08dff',
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    letterSpacing: 2.4,
    marginBottom: 12,
    textAlign: 'center',
  },
  headline: {
    fontSize: 42,
    lineHeight: 48,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    fontFamily: 'Outfit_800ExtraBold',
  },
  formCard: {
    backgroundColor: 'rgba(18, 18, 18, 0.82)',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  formTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 8,
  },
  formCopy: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 20,
  },
  formCopyStrong: {
    color: '#ffffff',
    fontFamily: 'Outfit_700Bold',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  otpCell: {
    width: 46,
    height: 58,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpCellActive: {
    borderColor: 'rgba(224, 141, 255, 0.9)',
    shadowColor: '#bc00fb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  otpDigit: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Outfit_800ExtraBold',
    textAlign: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#e08dff',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bc00fb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: '#4f006c',
    fontSize: 16,
    fontFamily: 'Outfit_800ExtraBold',
  },
  secondaryButton: {
    marginTop: 10,
    height: 54,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 38, 38, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(73, 72, 71, 0.15)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  resendRow: {
    marginTop: 18,
    alignItems: 'center',
    gap: 6,
  },
  resendText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
  },
  resendAction: {
    color: '#e08dff',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  resendActionMuted: {
    color: 'rgba(224, 141, 255, 0.5)',
  },
});

export default OtpVerificationScreen;
