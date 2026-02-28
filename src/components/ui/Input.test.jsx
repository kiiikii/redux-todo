/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {

  //* kalau tidak sedang fokus pada placeholder nantinya akan menampilkan tambah tugas baru
  it('harus menampilkan placeholder default', () => {
    render(<Input value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Tambah Tugas Baru')).toBeInTheDocument();
  });

  //* disini nantinya kalau semisal mengetik tulisan tambah tugas baru akan berubah sesuai dengan inputan user
  it('harus memanggil fungsi onChange saat user mengetik', () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Tambah Tugas Baru');
    
    fireEvent.change(input, { target: { value: 'Belajar Vitest' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('harus sesuai dengan snapshot', () => {
    const { asFragment } = render(<Input value="Test" onChange={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
});