import Button from '../Button/Button';
import { useWeb3Auth } from "../../hooks/useWeb3Auth";

const Header = () => {
  const {web3authProvider, login, logout} = useWeb3Auth();

  return (
    <>
      <header className="mx-40 mt-11 flex justify-between">
        <h1 className="text-3xl font-bold">Deformed</h1>
        <Button onClick={web3authProvider ? logout : login} theme="black">{web3authProvider ? "Log Out": "Log In"}</Button>
      </header>
    </>
  );
};

export default Header;
