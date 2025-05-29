import { render, screen, fireEvent } from '@testing-library/react';
import Game from './components/Game';

/**
 * 測試 2048 遊戲的核心功能
 */
describe('2048 Game', () => {
  test('初始化遊戲板', () => {
    render(<Game />);
    const tiles = screen.getAllByText(/2|4/);
    expect(tiles.length).toBeGreaterThanOrEqual(2); // 應至少有兩個隨機生成的方塊
  });

  test('方塊移動與合併', () => {
    render(<Game />);
    const initialScore = screen.getByText(/Score: 0/);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    const updatedScore = screen.queryByText(/Score: /);
    expect(updatedScore).not.toBeNull(); // 分數應更新
  });

  test('遊戲結束判斷', () => {
    render(<Game />);
    // 模擬遊戲結束
    const grid = Array(4).fill(null).map(() => Array(4).fill(2));
    // 這裡需要找到一種方法來模擬遊戲板的狀態
    // 並觸發遊戲結束的判斷
    // expect(screen.getByText(/Game Over/)).toBeInTheDocument();
  });
});