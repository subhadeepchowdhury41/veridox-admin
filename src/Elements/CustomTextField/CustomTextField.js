import {forwardRef} from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input', {
  shouldForwardProp: prop => prop !== 'width'
})(
  ({ theme, width }) => ({
  width: width ?? '320px',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: '12px',
  borderRadius: '12px',
  color: '#24292f',
  background: '#fff',
  border: '1px solid #d0d7de',
  boxShadow: '0px 4px 30px #d0d7de',
  '&:hover': {
    borderColor: '#3399FF'
  },
  '&:focus': {
    borderColor: '#3399FF',
    outline: '3px solid #b6daff'
  }})
);

export const CustomTextField = forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled slots={{ input: StyledInputElement }} {...props} ref={ref} />
  );
});
