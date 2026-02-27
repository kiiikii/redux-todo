import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';
import Info from './Info';

describe('Info Component', () => {
  it('harus merender label Selesai dengan warna ungu (Snapshot)', () => {
    const { asFragment } = render(<Info totalTasks={5} completedTasks={2} />);
    
    // Snapshot Testing untuk konsistensi UI
    expect(asFragment()).toMatchSnapshot();

    const labelSelesai = screen.getByText(/Selesai/i);
    expect(labelSelesai).toHaveClass('text-purple');
  });
});