/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';
import Delete from './Delete';

describe('Interactive Elements', () => {
  it('Checkbox harus menampilkan warna ungu-dark saat checked', () => {
    render(<Checkbox checked={true} onClick={() => {}} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-purple-dark');
  });

  it('Delete button harus memicu fungsi onClick saat diklik', () => {
    const handleClick = vi.fn();
    render(<Delete onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});