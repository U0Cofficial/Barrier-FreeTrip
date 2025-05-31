// 로그인 상태에 따라 사용자를 보호된 경로로 접근시키거나 로그인 페이지로 리디렉션하는 컴포넌트입니다.

import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

export default function PrivateRoute({ element }) {
  const user = useRecoilValue(userState); // 전역 사용자 상태 불러오기
  // 사용자가 로그인되어 있으면 접근 허용, 아니면 로그인 페이지로 리디렉션
  return user ? element : <Navigate to="/" />;
}