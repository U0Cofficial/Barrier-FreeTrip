import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { Navigate } from "react-router-dom";

export default function HomeRedirect() {
  const user = useRecoilValue(userState);

  if (user && user.id) {
    return <Navigate to="/mainpage" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}