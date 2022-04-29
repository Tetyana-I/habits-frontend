import { render } from '@testing-library/react';
import GuideList from './GuideList';

test('renders without crashing', () => {
  render(<GuideList />);
});