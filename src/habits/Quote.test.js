import { render } from '@testing-library/react';
import Quote from './Quote';

test('renders without crashing', () => {
  render(<Quote />);
});