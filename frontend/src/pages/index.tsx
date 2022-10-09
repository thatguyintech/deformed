import { useRouter } from "next/router";
import { Main } from "@/templates/Main";
import Button from "@/components/Button/Button";

const Index = () => {
  const router = useRouter();

  return (
    <Main>
      <div className="flex justify-center mt-10 gap-x-3">
        <Button
          theme="primary"
          onClick={() => {
            router.push("/create");
          }}
        >
          Create Form
        </Button>
        <Button
          theme="whiteBorder"
          onClick={() => {
            router.push("/view");
          }}
        >
          View Forms
        </Button>
      </div>
    </Main>
  );
};

export default Index;
