// import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
// import Joyride, { type Step, STATUS, type CallBackProps } from "react-joyride";

function App() {
//   const [run, setRun] = useState(false);

//   const steps: Step[] = [
//     { target: ".nav-home", content: "This is the homepage link." },
//     { target: ".nav-about", content: "Here you can learn more about us." },
//     { target: ".nav-contact", content: "Need help? Contact us here." },
//   ];

//   useEffect(() => {
//     const hasVisited = localStorage.getItem("hasVisited");
//     if (!hasVisited) {
//       setRun(true);
//       localStorage.setItem("hasVisited", "true");
//     }
//   }, []);

//   const handleJoyrideCallback = (data: CallBackProps) => {
//   const { status } = data;
//   if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
//     setRun(false);
//   }
// };


  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  );
}

export default App;
