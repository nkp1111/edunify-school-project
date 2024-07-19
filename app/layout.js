import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/header.jsx"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edunify- school project",
  description: "Created by neeraj parmar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="transition-all duration-300 ease-linear">
      <body className={inter.className}>
        <ToastContainer />
        <Header />
        {children}
      </body>
    </html>
  );
}
