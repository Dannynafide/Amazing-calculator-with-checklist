import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {MdArrowBack} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/buttons/Button/Button';
import MainTemplate from '../MainTemplate/MainTemplate';
import IconButton from '../../components/buttons/IconButton/IconButton';
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
              <p className="change-name-template__form--cost">{value}</p>

              <Button type="submit" className="change-name-template__form--btn">
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
