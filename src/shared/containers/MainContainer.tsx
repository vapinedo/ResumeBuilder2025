import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@shared/components/Navbar';
import Breadcrumbs from '@shared/components/Breadcrumbs';

const MainContainer = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <section className="container-fluid mt-5 mb-5 px-5">
      <Toaster />
      <Breadcrumbs />
      {children}
    </section>
  </>
);

export default MainContainer;
