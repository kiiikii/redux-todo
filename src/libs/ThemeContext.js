import { useContext, createContext } from "react";

// Hanya inisialisasi, tanpa export default komponen
export const ThemeContext = createContext(undefined);

// Hook diletakkan di sini tidak apa-apa selama ThemeContext diimpor dari luar
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}