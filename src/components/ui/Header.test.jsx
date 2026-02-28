/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../libs/ThemeProvider";
import Layout from "../Layout";

//* disini kita describe dulu untuk testnya seperti apa dan harus menampilkan apa
describe("Header Component", () => {
  it("harus menampilkan logo roket dan judul dengan warna yang benar", () => {
    render(
      <ThemeProvider>
        <Layout>
          <div>Content Test</div>
        </Layout>
      </ThemeProvider>,
    );

    //* 1. cek logo roket (kriteria: tidak gepeng dengan object-contain)
    const logo = screen.getByAltText(/Roket Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("object-contain");

    //* 2. cek warna Text judul (Kriteria: sesuai desain gambar 1)
    const textTo = screen.getByText("to");
    const textDo = screen.getByText("do");
    expect(textTo).toHaveClass("text-blue");
    expect(textDo).toHaveClass("text-purple-dark");

    //* 3. cek apakah children dirender dengan benar
    expect(screen.getByText("Content Test")).toBeInTheDocument();
  });

  it("harus sesuai dengan snapshot untuk memastikan strukturnya tidak berubah", () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Layout>
          <div />
        </Layout>
      </ThemeProvider>,
    );

    //* kunci untuk tampilan UI dengan kriteria snapshot testing
    expect(asFragment()).toMatchSnapshot();
  });
});
