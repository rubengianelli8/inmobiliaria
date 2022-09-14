import dynamic from "next/dynamic";
import Download from "@/containers/client/download";

const Download = dynamic(() => import("../../containers/client/download"), {
  ssr: false,
});
const index = () => {
  return <Download />;
};

export default index;
