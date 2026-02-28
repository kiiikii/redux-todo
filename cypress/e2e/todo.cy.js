/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Todo App E2E', () => {
  beforeEach(() => {
    // Pastikan aplikasi kamu sedang jalan (pnpm run dev)
    cy.visit('http://localhost:5173'); 
  });

  it('Berhasil memuat data, menambah, dan menghapus todo', () => {
    // 1. Cek pengambilan data API (Kriteria 2.1)
    cy.get('p').should('exist');

    // 2. Menambah Todo (Kriteria 2.2)
    const newTodo = 'Fitur Baru PWA';
    cy.get('input').type(newTodo);
    cy.get('button[type="submit"]').click();
    cy.contains(newTodo).should('be.visible');

    // 3. Mengubah Status (Kriteria 2.2)
    cy.get('input[type="checkbox"]').first().click();

    // 4. Menghapus Todo (Kriteria 2.2)
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true); // Klik OK otomatis pada alert hapus
    });
    cy.get('button').last().click(); 
    cy.contains(newTodo).should('not.exist');
  });
});