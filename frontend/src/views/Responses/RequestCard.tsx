import { useEffect, useState } from "react";

interface RequestCardProps {
  answers: any;
  address: string;
  fields: any;
}

const RequestCard = ({ answers, address, fields }: RequestCardProps) => {
  return (
    <>
      <div className="bg-white shadow-md w-full rounded-lg px-6 py-4 border-solid border-[1px] border-gray">
        <div className="mb-3 flex items-center">
          <p className="text-sm">
            Address: <span className="ml-4 font-semibold">{address}</span>
          </p>
        </div>

        {answers?.formAnswers?.map((formAnswer: any, index: number) => {
          const question = fields.filter(
            (field: any) => field.referenceId === formAnswer.referenceId
          )[0]?.title;

          return (
            <div className="mb-2" key={formAnswer.referenceId}>
              <QuestionAnswer
                question={question ?? `Question ${index + 1}`}
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
