import { render } from '@testing-library/react';
import SignupForm from './SignupForm';

test('renders without crashing', () => {
  render(<SignupForm />);
});