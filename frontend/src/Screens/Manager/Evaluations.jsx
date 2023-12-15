import axios from "axios";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { baseApiURL } from "../../baseUrl";

const Evaluations = () => {
  const [sector, setSector] = useState();
  const [branch, setBranch] = useState();
  const [employeeData, setEmployeeData] = useState();
  const [selected, setSelected] = useState({
    branch: "",
    season: "",
    sector: "",
    indicatorType: "",
  });
  const loadEmployeeDetails = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/employee/details/getDetails`,
        { branch: selected.branch, season: selected.season },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setEmployeeData(response.data.user);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const submitEvaluationsHandler = () => {
    let container = document.getElementById("evaluationContainer");
    container.childNodes.forEach((enroll) => {
      setEmployeeEvaluationsHandler(
        enroll.id,
        document.getElementById(enroll.id + "evaluations").value
      );
    });
  };

  const setEmployeeEvaluationsHandler = (enrollment, value) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/evaluations/addEvaluations`,
        {
          enrollmentNo: enrollment,
          [selected.indicatorType]: {
            [selected.sector]: value,
          },
        },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.dismiss();
          toast.success(response.data.message);
        } else {
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const getSectorData = () => {
    toast.loading("Loading Sectors");
    axios
      .get(`${baseApiURL()}/sector/getSector`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSector(response.data.sector);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBranchData();
    getSectorData();
  }, []);

  const resetValueHandler = () => {
    setEmployeeData();
  };

  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title={`Upload Evaluations`} />
        {employeeData && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={resetValueHandler}
          >
            <span className="mr-2">
              <BiArrowBack className="text-red-500" />
            </span>
            Close
          </button>
        )}
      </div>
      {!employeeData && (
        <>
          <div className="mt-10 w-full flex justify-evenly items-center gap-x-6">
            <div className="w-full">
              <label htmlFor="branch" className="leading-7 text-base ">
                Select Branch
              </label>
              <select
                id="branch"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.branch}
                onChange={(e) =>
                  setSelected({ ...selected, branch: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {branch &&
                  branch.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="season" className="leading-7 text-base ">
                Select Season
              </label>
              <select
                id="season"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.season}
                onChange={(e) =>
                  setSelected({ ...selected, season: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="1">Spring season</option>
                <option value="2">Summer season</option>
                <option value="3">Autumn season</option>
                <option value="4">Winter season</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="sector" className="leading-7 text-base ">
                Select Sector
              </label>
              <select
                id="sector"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.sector}
                onChange={(e) =>
                  setSelected({ ...selected, sector: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                {sector &&
                  sector.map((sector) => {
                    return (
                      <option value={sector.name} key={sector.name}>
                        {sector.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="indicatorType" className="leading-7 text-base ">
                Select Indicator Type
              </label>
              <select
                id="indicatorType"
                className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                value={selected.indicatorType}
                onChange={(e) =>
                  setSelected({ ...selected, indicatorType: e.target.value })
                }
              >
                <option defaultValue>-- Select --</option>
                <option value="performance">Performance</option>
                <option value="competence">Competence</option>
              </select>
            </div>
          </div>
          <button
            className="bg-blue-50 px-4 py-2 mt-8 mx-auto rounded border-2 border-blue-500 text-black"
            onClick={loadEmployeeDetails}
          >
            Load Employee Data
          </button>
        </>
      )}
      {employeeData && employeeData.length !== 0 && (
        <>
          <p className="mt-4 text-lg">
            Upload {selected.indicatorType} Evaluations Of {selected.branch} Season{" "}
            {selected.season} of {selected.sector}
          </p>
          <div
            className="w-full flex flex-wrap justify-center items-center mt-8 gap-4"
            id="evaluationContainer"
          >
            {employeeData.map((employee) => {
              return (
                <div
                  key={employee.enrollmentNo}
                  className="w-[30%] flex justify-between items-center border-2 border-blue-500 rounded"
                  id={employee.enrollmentNo}
                >
                  <p className="text-lg px-4 w-1/2 bg-blue-50">
                    {employee.enrollmentNo}
                  </p>
                  <input
                    type="number"
                    className="px-6 py-2 focus:ring-0 outline-none w-1/2"
                    placeholder="Enter Evaluations"
                    id={`${employee.enrollmentNo}evaluations`}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-blue-500 px-6 py-3 mt-8 mx-auto rounded text-white"
            onClick={submitEvaluationsHandler}
          >
            Upload Employee Evaluations
          </button>
        </>
      )}
    </div>
  );
};

export default Evaluations;
