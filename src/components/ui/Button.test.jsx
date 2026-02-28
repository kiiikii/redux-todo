/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {

  //* disini di test labelnya
  it('harus merender teks "Tambah"', () => {
    render(<Button disabled={false} />);
    expect(screen.getByText(/Tambah/i)).toBeInTheDocument();
  });

  //* jadi ketika tidak ada inputan tombol akan disable 
  it('harus berstatus disabled saat prop disabled bernilai true', () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('harus sesuai dengan snapshot', () => {
    const { asFragment } = render(<Button disabled={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});