import { createAnswer } from "@/api/forms";
import Card from "@/components/Card/Card";
import { Main } from "@/templates/Main";
import AnswerForm from "./AnswerForm";

const fields = [
  {
    type: "shortText",
    title: "What is your name?",
    required: true,
    referenceId: "nameQuestion",
  },
  {
    type: "shortText",
    title: "Which email do you use for Alchemy?",
    required: true,
    description:
      "If you don't have an Alchemy account, make sure to click here to sign up for an account now, for FREE!",
    referenceId: "emailQuestion",
  },
  {
    type: "longText",
    title: "Share your learnings!",
    required: true,
    description:
      "1. What was the biggest lesson from this challenge? \n2. What did you like/dislike about this challenge? Why? \n3. What do you want to build next?",
    referenceId: "shareYourLearningsQuestion",
  },
  {
    type: "multipleChoice",
    title: "Which country or region are you coding from?",
    required: true,
    referenceId: "countryRegionQuestion",
    properties: {
      choices: ["India", "Taiwan", "Nigeria", "Japan"],
      allowOtherChoice: false,
    },
  },
];

const Answer = () => {
  const submitAnswer = async (value: any) => {
    try {
      await createAnswer({
        formId: "",
        formAnswers: [],
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Main>
        <Card className="rounded py-10 px-12 bg-white flex-col shadow-md">
          {/* <h2 className="text-center">Answer Form</h2> */}

          <AnswerForm
            className="w-full mb-5"
            fields={fields}
            onSubmit={submitAnswer}
          />
        </Card>
      </Main>
    </>
  );
};

export default Answer;
