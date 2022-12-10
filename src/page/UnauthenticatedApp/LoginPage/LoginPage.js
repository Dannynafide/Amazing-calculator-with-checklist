import {Formik} from 'formik';
import PropTypes from 'prop-types';

import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import {useAuth} from 'context/authContext';
import AuthTemplate from 'components/templates/AuthTemplate/AuthTemplate';
import './loginPage.scss';

export default function Login(props) {
  const {login} = useAuth();

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
    <AuthTemplate title="Login">
      <Formik
        initialValues={{email: '', password: ''}}
        validate={(values) => validate(values)}
        onSubmit={async (values, {setFieldError}) => {
          try {
            await login(values.email, values.password);
          } catch (ex) {
            setFieldError('backendError', ex.response.data.error.message);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="E-mail adress"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <Input
              type="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>

            {errors.backendError ? <div>{errors.backendError}</div> : null}
          </form>
        )}
      </Formik>
      <div className="mrg-top-20">
        <Button secondary onClick={props.replacement}>
          Registration form
        </Button>
      </div>

      <div className="test-data">
        Data for testing: <br />
        Email: a@a.pl <br />
        Password: tajne1234
      </div>
    </AuthTemplate>
  );
}

Login.propTypes = {
  replacement: PropTypes.func.isRequired,
};
