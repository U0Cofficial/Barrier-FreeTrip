import { ReactComponent as Logo } from "../../src/assets/Title.svg";
import { ReactComponent as Login } from "../../src/assets/로그인.svg";
export default function Header() {
  return (
    <div className="bg-white">
      <div className="max-w-full mx-auto px-3 border-b-1 px-6">
        <div className="flex items-center gap-5 justify-between py-3 border-b-[1px]">
          <div>
            <Logo className="w-[236px] h-[56px]" />
          </div>
        
          <div className="flex items-center gap-[78px]">
            <div className="text-[20px] font-semibold text-[#1F2937]">
              <a href="/">여행추천</a>
            </div>
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
          <div className="flex items-center gap-[20px] text-[#818181]">
            <div>

              <Login className="w-[24px] h-[24px]" />
            </div>
          <div className="text-[20px] font-semibold text-[#818181]">
              <a href="/blog">로그인 </a>
            </div>|
            <div className="text-[20px] font-semibold text-[#818181]">
              <a href="/blog">회원가입</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
