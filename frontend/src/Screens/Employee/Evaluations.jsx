import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import { baseApiURL } from "../../baseUrl";

const Evaluations = () => {
  const { userData } = useSelector((state) => state);
  const [performance, setPerformance] = useState();
  const [competence, setCompetence] = useState();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL}/evaluations/getEvaluations`,
        { enrollmentNo: userData.enrollmentNo },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data) {
          setPerformance(response.data.Evaluation[0].performance);
          setCompetence(response.data.Evaluation[0].competence);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [userData.enrollmentNo]); // Include 'userData.enrollmentNo' as a dependency

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <Heading title={`Evaluations of Season ${userData.season}`} />
      <div className="mt-14 w-full flex gap-20">
        {performance && (
          <div className="w-1/2 shadow-md p-4">
            <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2">
            Performance Evaluations (Out of 40)
            </p>
            <div className="mt-5">
              {Object.keys(performance).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full text-lg mt-2"
                  >
                    <p className="w-full">{item}</p>
                    <span>{performance[item]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {competence && (
          <div className="w-1/2 shadow-md p-4">
            <p className="border-b-2 border-red-500 text-2xl font-semibold pb-2">
            Competence Evaluations (Out of 60)
            </p>
            <div className="mt-5">
              {Object.keys(competence).map((item, index) => {
                console.log(competence);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full text-lg mt-2"
                  >
                    <p className="w-full">{item}</p>
                    <span>{competence[item]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!performance && !competence && <p>No Evaluations Available At The Moment!</p>}
      </div>
    </div>
  );
};

export default Evaluations;
