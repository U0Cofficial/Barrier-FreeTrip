import { ReactComponent as Logo } from "../../src/assets/Title.svg";
import { ReactComponent as Login } from "../../src/assets/로그인.svg";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";

export default function Header() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto px-3 border-b-1 px-6">
        <div className="flex items-center gap-5 justify-between py-3 border-b-[1px]">
          {/* 로고 */}
          <div onClick={() => navigate(user && user.id ? "/mainpage" : "/")}>
            <Logo className="w-[236px] h-[56px]" />
          </div>

          <div className="flex items-center gap-[78px]">
            <button
              className="text-[20px] font-semibold text-[#1F2937]"
              onClick={() => navigate("/OptionPage")}
            >
              여행추천
            </button>

            <button
              className="text-[20px] font-semibold text-[#1F2937]"
              onClick={() => navigate("/CommunityPage")}
            >
              커뮤니티
            </button>
            <button
              className="text-[20px] font-semibold text-[#1F2937]"
              onClick={() => navigate("/ArrangementPage")}
            >
              나의 여행
            </button>
            <button
              className="text-[20px] font-semibold text-[#1F2937]"
              onClick={() => navigate("/EvaluationPage")}
            >
              여행시설 평가
            </button>
            <button
              className="text-[20px] font-semibold text-[#1F2937]"
              onClick={() => navigate("/AssistancePage")}
            >
              여행지원
            </button>
          </div>

          {/* 로그인 or 로그아웃 */}
          <div className="flex items-center gap-[20px] text-[#818181]">
            {user && user.id ? (
              <>
                <span className="text-[20px] font-semibold text-[#818181] mr-2">
                  {user.name}님
                </span>
                <button
                  className="text-[20px] font-semibold text-[#818181]"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Login className="w-[24px] h-[24px]" />
                <div className="text-[20px] font-semibold text-[#818181]">
                  <a href="/login">로그인</a>
                </div>
                <div className="text-[20px] font-semibold text-[#818181]">
                  <a href="/signup">회원가입</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
