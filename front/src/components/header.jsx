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
    setUser({ id: null, name: "" });
    navigate("/");
  };

  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto px-3 border-b-1 px-6">
        <div className="flex items-center gap-5 justify-between py-3 border-b-[1px]">
          {/* 로고 */}
          <div
              onClick={() => navigate("/mainpage")}>
            <Logo className="w-[236px] h-[56px]"
            />
          </div>

          {/* 네비게이션 */}
          <div className="flex items-center gap-[78px]">
            <button className="text-[20px] font-semibold text-[#1F2937]"
            onClick={() => navigate("/OptionPage")}>
              여행추천
            </button>
            <div className="text-[20px] font-semibold text-[#1F2937]">
              <a href="/about">여행지원</a>
            </div>
            <div className="text-[20px] font-semibold text-[#1F2937]">
              <a href="/contact">커뮤니티</a>
            </div>
            <div className="text-[20px] font-semibold text-[#1F2937]">
              <a href="/blog">여행시설 평가</a>
            </div>
            <div className="text-[20px] font-semibold text-[#1F2937]">
              <a href="/blog">나의 여정</a>
            </div>
          </div>

          {/* 로그인 or 로그아웃 */}
          <div className="flex items-center gap-[20px] text-[#818181]">
            {user.id ? (
              <>
                <span className="text-gray-600 mr-2">{user.name}님</span>
                <button onClick={handleLogout}>로그아웃</button>
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
