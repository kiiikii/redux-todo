import React from "react";
import Roket from "../assets/rocket.png";
import { memo } from "react";

const Layout = memo(({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-600 transition-colors duration-300">
      <header className="w-full h-50 bg-gray-200 dark:bg-gray-700 flex justify-center items-center">
        <div className="flex items-center gap-3">
          <img src={Roket} alt="Roket Logo" className="h-9 object-contain" />
          <h1 className="text-4xl font-black italic">
            <span className="text-blue">to</span>
            <span className="text-purple-dark">do</span>
          </h1>
        </div>
      </header>

      <main className="max-w-184 mx-auto px-4">
        <section className="-mt-7">
          {children}
        </section>
      </main>
    </div>
  );
})

export default Layout