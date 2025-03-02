import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, noMainWrapper = false, dark = false, mainClear = false }) => {
  console.log(children)
  return (
    <>
      <Header />
      {noMainWrapper ? (
        children
      ) : (
        <main className={`${dark ? 'main--dark' : ''} ${mainClear ? 'main-clear' : ''}`.trim()}>
          <section className='section-flex'>
            {children}
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Layout;
