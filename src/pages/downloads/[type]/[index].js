import dynamic from "next/dynamic";

const Download = dynamic(() => import("../../../containers/client/download"), {
  ssr: false,
});
const index = () => {
  return <Download />;
};

export default index;
