import Button from "../Button/Button";
import { useWeb3Auth } from "../../hooks/useWeb3Auth";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = () => {
  const { web3authProvider, login, logout, address } = useWeb3Auth();
  const router = useRouter();

  return (
    <>
      <header className="mx-40 mt-11 flex justify-between">
        <Button
          theme="custom"
          onClick={() => {
            router.push("/");
          }}
          className="flex items-center gap-x-3"
        >
          <img src="/icons/logo.png" width="32rem" height="32rem" alt="" />
          <h1 className="text-2xl font-semibold">DeFormed</h1>
        </Button>
        { web3authProvider ? (<div>{"Logged in as: "+address}</div>) : "Please log in!"}
        <Button onClick={web3authProvider ? logout : login} theme="black">
          {web3authProvider ? "Log Out" : "Log In"}
        </Button>
      </header>
    </>
  );
};

export default Header;
