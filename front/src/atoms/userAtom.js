// Recoil에서 상태 관리를 위한 atom 생성
import { atom } from "recoil";

// 로그인한 사용자 정보를 전역으로 관리하는 상태 정의
export const userState = atom({
  key: "userState", // 이 atom의 고유 식별자 (Recoil 내부적으로 사용됨)
  default: {
    id: null,       // 사용자 ID (로그인하지 않은 경우 null)
    name: "",       // 사용자 이름 (기본값은 빈 문자열)
  },
});