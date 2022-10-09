import { Main } from "@/templates/Main";
import Create from "@/views/Create/Create";
import { useWeb3Auth } from "../hooks/useWeb3Auth";
import RPC from "../utils/web3RPC";

const CreatePage = () => {
  const {web3authProvider} = useWeb3Auth();

  // TODO: call this when admin submits form creation
  const sendTransaction = async () => {
    if (!web3authProvider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3authProvider);
    // TODO: implement the create form transaction
    const receipt = await rpc.sendTestTransaction();
    console.log(receipt);
  };

  // Uncomment to try out the transaction
  // sendTransaction();

  return (
    <>
      <Main>
        <Create />
      </Main>
    </>
  );
};

export default CreatePage;
