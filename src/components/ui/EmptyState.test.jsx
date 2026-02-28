/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState Component', () => {
  it('harus merender pesan teks kosong dengan benar', () => {
    render(<EmptyState />);
    expect(screen.getByText('Belum ada tugas untuk saat ini')).toBeInTheDocument();
  });

  it('harus sesuai dengan snapshot', () => {
    const { asFragment } = render(<EmptyState />);
    expect(asFragment()).toMatchSnapshot();
  });
});