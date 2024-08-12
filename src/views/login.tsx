import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setFormVisible(true);
    }, 700);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password);
      //@ts-ignore
      navigation.navigate('MapView');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ha ocurrido un error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/earth.jpg')}
      style={styles.background}
    >
      <View style={styles.overlayContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.secondary} />
          </View>
        )}
        {!loading && formVisible && (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Bienvenido a Sepumap👋</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo electrónico no es válido',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Correo Electrónico"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
              control={control}
              name="password"
              rules={{ required: 'La contraseña es obligatoria' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.background} />
              ) : (
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              )}
            </TouchableOpacity>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 12,
    color: 'red',
    marginBottom: 15,
  },
});

export default LoginPage;
