import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * 測試 App 元件是否正確渲染 2048 標題
 */
test('renders 2048 title', () => {
  render(<App />);
  const titleElement = screen.getByText(/2048/i);
  expect(titleElement).toBeInTheDocument();
});
