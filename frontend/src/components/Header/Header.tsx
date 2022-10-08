import Button from '../Button/Button';

const Header = () => {
  return (
    <>
      <header className="mx-40 mt-11 flex justify-between">
        <h1 className="text-3xl font-bold">Deformed</h1>
        <Button theme="black">Connect Wallet</Button>
      </header>
    </>
  );
};

export default Header;
