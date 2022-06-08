import {Formik, Form, ErrorMessage} from 'formik';
import PropTypes from 'prop-types';
import {useAuth} from '../../../context/authContext';
import AuthTemplate from '../../../templates/AuthTemplate/AuthTemplate';
import Input from '../../../components/Input/Input';
import Button from '../../../components/buttons/Button/Button';

function RegisterPage(props) {
  const {register} = useAuth();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 5) {
      errors.password = 'Must be 5 characters or more';
    }

    return errors;
  };

  return (
    <AuthTemplate title="Registration">
      <Formik
        initialValues={{email: '', password: ''}}
        validate={(values) => validate(values)}
        onSubmit={async (values, {setFieldError}) => {
          try {
            await register(values.email, values.password);
          } catch (ex) {
            setFieldError('backendError', ex.response.data.error.message);
          }
        }}
      >
        {({values, errors, handleChange, handleBlur, isSubmitting}) => (
          <Form>
            <Input
              type="email"
              name="email"
              placeholder="E-mail adress"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" component="div" />

            <Input
              type="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorMessage name="password" component="div" />

            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>

            {errors.backendError ? (
              <div>Error: {errors.backendError}</div>
            ) : null}
          </Form>
        )}
      </Formik>
      <div className="mrg-top-20">
        <Button secondary onClick={props.replacement}>
          Login form
        </Button>
      </div>
    </AuthTemplate>
  );
}

export default RegisterPage;

RegisterPage.propTypes = {
  replacement: PropTypes.func.isRequired,
};
