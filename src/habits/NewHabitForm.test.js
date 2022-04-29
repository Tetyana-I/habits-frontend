import { render } from '@testing-library/react';
import NewHabitForm from './NewHabitForm';

test('renders without crashing', () => {
  render(<NewHabitForm />);
});