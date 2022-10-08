import Header from '@/components/Header/Header';

const Layout = ({ children }: any) => {
  return (
    <div className="z-0 flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
