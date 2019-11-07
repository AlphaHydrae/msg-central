import { reduce } from 'lodash';
import { ChangeEvent, ElementType, FormEvent } from 'react';
import { FormControlProps } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';

export type FormCheckboxChangeEvent = ChangeEvent<HTMLInputElement>;
export type FormInputChangeEvent = FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>;
export type FormSelectChangeEvent = FormEvent<ReplaceProps<ElementType, BsPrefixProps<ElementType> & FormControlProps>>;
export type FormSubmitEvent = FormEvent<HTMLFormElement>;

export function isFormValid<T extends object>(validations: T) {
  return reduce(validations, (memo, value) => memo && Boolean(value), true);
}