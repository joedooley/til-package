import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider as ReactHookFormProvider } from 'react-hook-form';
import Input from './fields/input';
import Textarea from './fields/textarea';
import Select from './fields/select';
import FileInput from './fields/file-input';
import Datepicker from './fields/datepicker';
import Search from './fields/search';
import Toggle from './fields/toggle';
import Wysiwyg from './fields/wysiwyg';
import PillSelect from './fields/pillselector';

const FormContext = React.createContext();

export default function Form({ schema, defaultValues, mode = 'onBlur', children, ...rest }) {
  const methods = useForm({ defaultValues, mode, resolver: yupResolver(schema) });

  return (
    <FormContext.Provider value={defaultValues}>
      <ReactHookFormProvider {...methods}>
        <form
          autoComplete="off"
          noValidate
          className={rest.className}
          css={css`
            align-items: center;
            display: flex;
            flex-direction: column;
          `}
        >
          {children}
        </form>
      </ReactHookFormProvider>
    </FormContext.Provider>
  );
}

Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.FileInput = FileInput;
Form.Datepicker = Datepicker;
Form.Search = Search;
Form.Toggle = Toggle;
Form.Wysiwyg = Wysiwyg;
Form.PillSelect = PillSelect;

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
  mode: PropTypes.oneOf(['onSubmit', 'onBlur', 'onChange', 'onTouched', 'all']),
  children: PropTypes.node,
};
