import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

export default function PrivateRoute({ element }) {
  const user = useRecoilValue(userState);
  return user ? element : <Navigate to="/" />;
}