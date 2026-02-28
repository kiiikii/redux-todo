/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Stats from './Stats';

describe('Stats Component', () => {
  //* disini label harus bisa menampilkan selesai dan belum selesai
  it('harus merender label "Belum Selesai" dan "Selesai"', () => {
    render(<Stats total={10} completed={3} />);
    expect(screen.getByText('Belum Selesai')).toHaveClass('text-blue');
    expect(screen.getByText('Selesai')).toHaveClass('text-purple');
  });

  //* disini nantinya kalau kosong harus menampilkan angka 0 
  it('harus menampilkan angka 0 jika tidak ada tugas', () => {
    render(<Stats total={0} completed={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  
  it('harus menampilkan format "X dari Y" saat ada tugas', () => {
    render(<Stats total={10} completed={3} />);
    expect(screen.getByText('3 dari 10')).toBeInTheDocument();
  });

  it('harus sesuai dengan snapshot', () => {
    const { asFragment } = render(<Stats total={5} completed={2} />);
    expect(asFragment()).toMatchSnapshot();
  });
});