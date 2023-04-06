import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

interface FormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema: any;
  submitButtonText?: string;
}

const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  submitButtonText,
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const handleBlur = (field: string) => {
    setTouched({...touched, [field]: true});
  };

  const handleChange = (field: string, value: any) => {
    setValues({...values, [field]: value});
    setErrors({...errors, [field]: undefined});
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(values, {abortEarly: false});
      onSubmit(values);
    } catch (error: any) {
      const newErrors: any = {};
      error.inner.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Item Name"
        value={values.name}
        onChangeText={value => handleChange('name', value)}
        onBlur={() => handleBlur('name')}
      />
      {touched.name && errors.name && (
        <Text style={styles.error}>{errors.name}</Text>
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Description"
        value={values.description}
        onChangeText={value => handleChange('description', value)}
        onBlur={() => handleBlur('description')}
      />
      {touched.description && errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Text style={styles.label}>Total Stock</Text>
      <TextInput
        placeholder="900"
        value={values.totalStock}
        onChangeText={value => handleChange('totalStock', value)}
        onBlur={() => handleBlur('totalStock')}
        keyboardType="numeric"
      />
      {touched.totalStock && errors.totalStock && (
        <Text style={styles.error}>{errors.totalStock}</Text>
      )}

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="90"
        value={values.price}
        onChangeText={value => handleChange('price', value)}
        onBlur={() => handleBlur('price')}
        keyboardType="decimal-pad"
      />
      {touched.price && errors.price && (
        <Text style={styles.error}>{errors.price}</Text>
      )}

      <Button title={submitButtonText || 'Submit'} onPress={handleSubmit} />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  label: {
    padding: 5,
    color: 'black',
  },
  error: {
    color: 'red',
  },
});
