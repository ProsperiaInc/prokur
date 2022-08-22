import RfpEditor from "components/RFPEditor/RFPEditor";
import { useRouter } from "next/router";

const RFPEditorPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <RfpEditor id={id} />
  );
}

export default RFPEditorPage