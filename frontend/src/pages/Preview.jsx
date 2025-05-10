import React from "react";
import { useNavigate } from "react-router-dom";
import { PlatformLinks } from "../components/common";
import { useProfile } from "../hooks/useProfile";
import ImageIcon from "/images/avatar.jpeg";

const Preview = () => {
  const navigate = useNavigate();
  const { profile, isLoading } = useProfile();

  const avatar = profile?.avatar || ImageIcon;
  const name = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim();
  const email = profile?.email || "";

  return (
    <section className="relative lg:h-[110vh]">
      <nav className="p-[24px] sm:bg-primary sm:h-[357px] sm:rounded-b-[32px]">
        <div className="bg-white rounded-md p-[16px] lg:pl-[24px] flex gap-[16px] justify-between">
          <button
            onClick={() => navigate("/links")}
            className="py-[11px] px-[27px] font-semibold rounded text-base text-primary border border-primary hover:bg-primary-200 active:scale-95 duration-150 cursor-pointer"
          >
            Back to Editor
          </button>

          <button
            type="button"
            className="py-[11px] px-[27px] font-semibold rounded text-base text-white border border-none bg-primary hover:bg-primary-100 active:scale-95 duration-150 cursor-pointer"
          >
            Share Link
          </button>
        </div>
      </nav>

      {/* Preview */}
      <div className="flex justify-center">
        <div className="absolute top-[138px] sm:top-[208px] sm:bg-white sm:min-h-[569px] w-[237px] sm:w-[349px] mx-auto sm:px-[56px] py-[48px] rounded-[24px] shadow-[#0000001A]">
          <div className="flex flex-col gap-[56px]">
            <div className="flex flex-col gap-[25px] items-center justify-center text-center">
              <div className="rounded-full border-4 border-primary size-[104px] overflow-hidden">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <span className="flex flex-col gap-[8px]">
                <h2 className="text-[32px] font-bold leading-[48px] text-gray">
                  {isLoading ? "Loading..." : name || "No Name"}
                </h2>
                {email && <p className="text-neutral-700">{email}</p>}
              </span>
            </div>

            <div className="flex flex-col gap-[20px]">
              <PlatformLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
