import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, noMainWrapper = false,dark=false }) => {
  return (
    <>
      <Header />
      {noMainWrapper ? (
        children
      ) : (
        <main className={dark ? 'main--dark' : ''}>
          <section>
            {children} {/* Основной контент страницы */}
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Layout;
