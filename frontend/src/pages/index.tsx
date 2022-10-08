import { useRouter } from "next/router";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Index = () => {
  return (
    <Main
      meta={<Meta title="Deformed" description="Decentralized forms lol" />}
    ></Main>
  );
};

export default Index;
