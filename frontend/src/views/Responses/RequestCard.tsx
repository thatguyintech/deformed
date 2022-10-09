import { useEffect, useState } from "react";

interface RequestCardProps {
  answer: any;
  address: string;
}

const RequestCard = ({ answer, address }: RequestCardProps) => {
  return (
    <>
      <div className="bg-white shadow-md w-full rounded-lg px-6 py-4 border-solid border-[1px] border-gray">
        <div className="mb-3 flex items-center">
          <p className="text-sm">
            Requester: <span className="ml-4 font-semibold">{address}</span>
          </p>
        </div>

        {answer?.formAnswers?.map((formAnswer: any, index: number) => {
          return (
            <div className="mb-2" key={formAnswer.referenceId}>
              <QuestionAnswer
                question={`Question ${index + 1}`}
                answer={formAnswer.value}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const QuestionAnswer = ({ question, answer }: any) => {
  return (
    <>
      <p className="text-sm">
        {question}: <span className="font-semibold ml-3">{answer}</span>
      </p>
    </>
  );
};

export default RequestCard;
