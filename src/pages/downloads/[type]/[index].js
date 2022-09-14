import dynamic from "next/dynamic";
import Download from "@/containers/client/download";

const Downloaded = dynamic(() => import("../../containers/client/download"), {
  ssr: false,
});
const index = () => {
  return <Downloaded />;
};

export default index;
