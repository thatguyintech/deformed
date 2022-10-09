import Answer from "@/views/Answer/Answer";
import { useRouter } from "next/router";

const AnswerPage = () => {
  const router = useRouter();
  const { formId } = router.query;

  console.log(formId);

  return (
    <>
      <Answer formId={formId}></Answer>
    </>
  );
};

export default AnswerPage;
