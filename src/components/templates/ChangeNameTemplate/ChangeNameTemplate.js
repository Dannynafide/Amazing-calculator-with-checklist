import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {MdArrowBack} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import IconButton from 'components/atoms/IconButton/IconButton';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import './changeNameTemplate.scss';

export default function ChangeNameTemplate({name, value, submit}) {
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(-1);
  };

  return (
    <MainTemplate>
      <div>
        <IconButton
          className="change-name-template__back-icon"
          onClick={handleReturnClick}
        >
          <MdArrowBack />
        </IconButton>

        <Formik
          initialValues={{formName: name}}
          onSubmit={(values) => {
            submit(values.formName);
          }}
        >
          {({values, handleChange, handleBlur, handleSubmit}) => (
            <form
              onSubmit={handleSubmit}
              className="change-name-template__form"
            >
              <Input
                type="formName"
                name="formName"
                placeholder="Nazwa"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.formName}
              />
              <p className="change-name-template__form__cost">{value}</p>

              <Button type="submit" className="change-name-template__form__btn">
                Zapisz
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </MainTemplate>
  );
}

ChangeNameTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

ChangeNameTemplate.defaultProps = {
  value: null,
};
