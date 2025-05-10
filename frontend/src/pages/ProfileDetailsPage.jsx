import React, { useEffect, useState } from "react";
import { BaseLayout } from "../layouts/";
import { useProfile } from "../hooks/useProfile";
import { PhonePreview } from "../components/common";
import ImageIcon from "/images/icon-upload-image.svg";

const Profile = () => {
  const { profile, upsertProfile } = useProfile();
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        avatar: profile.avatar || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upsertProfile.mutate(form);
  };

  return (
    <BaseLayout>
      <section className="flex flex-col lg:flex-row gap-[24px]">
        <div className="hidden lg:flex justify-center items-center bg-white w-full max-w-[400px] xl:max-w-[560px] lg:min-h-[834px] p-[24px] rounded-[12px]">
          <PhonePreview userData={form} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col divide-y-2 w-full">
          <div className="flex flex-col gap-[40px] bg-white w-full p-[24px] lg:p-[40px] rounded-t-[12px]">
            <span className="flex flex-col gap-[8px]">
              <h2 className="text-[24px] md:text-[32px] font-bold leading-[36px] md:leading-[48px] text-gray">
                Profile Details
              </h2>
              <p className="text-neutral-700">
                Add your details to create a personal touch to your profile.
              </p>
            </span>

            <div className="flex flex-col gap-[24px]">
              <div className="bg-neutral-100 rounded-[12px] p-[20px] flex flex-col gap-[20px] justify-center items-center">
                <div className="flex flex-col sm:flex-row gap-[16px] justify-between items-center w-full">
                  <p className="text-neutral-700">Profile picture</p>

                  <div className="flex flex-col sm:flex-row gap-[24px] items-center">
                    <div className="relative w-[193px] h-[193px] rounded-md overflow-hidden">
                      <img
                        src={form.avatar?.startsWith('data:image') ? form.avatar : ImageIcon}
                        alt="Avatar Preview"
                        className="w-[193px] h-[193px] object-cover rounded-md"
                      />

                      <label
                        htmlFor="profile_picture"
                        className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center text-white text-base font-semibold cursor-pointer"
                      >
                        <img src={ImageIcon} className="w-6 h-6" />
                        <p>Change Image</p>
                      </label>
                      <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                    <p className="text-neutral-700 text-[12px] max-w-[215px]">
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-100 rounded-[12px] p-[20px] flex flex-col gap-[20px]">
                <span className="flex flex-col sm:flex-row gap-[4px] sm:gap-[16px] sm:items-center">
                  <label htmlFor="first_name" className="text-base text-neutral-700 min-w-[240px]">
                    First name*
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="e.g. John"
                    required
                    className="w-full px-[16px] py-[12px] text-base text-gray placeholder:text-gray placeholder:opacity-[0.5] bg-transparent outline-none border focus:border-primary focus:shadow-input rounded"
                  />
                </span>

                <span className="flex flex-col sm:flex-row gap-[4px] sm:gap-[16px] sm:items-center">
                  <label htmlFor="last_name" className="text-base text-neutral-700 min-w-[240px]">
                    Last name*
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="e.g. Appleseed"
                    required
                    className="w-full px-[16px] py-[12px] text-base text-gray placeholder:text-gray placeholder:opacity-[0.5] bg-transparent outline-none border focus:border-primary focus:shadow-input rounded"
                  />
                </span>

                <span className="flex flex-col sm:flex-row gap-[4px] sm:gap-[16px] sm:items-center">
                  <label htmlFor="email" className="text-base text-neutral-700 min-w-[240px]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. email@example.com"
                    className="w-full px-[16px] py-[12px] text-base text-gray placeholder:text-gray placeholder:opacity-[0.5] bg-transparent outline-none border focus:border-primary focus:shadow-input rounded"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:justify-end bg-white w-full p-[16px] md:py-[24px] md:px-[40px] lg:min-h-[94px] rounded-b-[12px]">
            <button
              type="submit"
              className="text-white font-semibold text-base bg-primary px-[27px] py-[11px] rounded disabled:bg-opacity-25 disabled:cursor-not-allowed active:scale-95 duration-200 w-full md:w-max cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </BaseLayout>
  );
};

export default Profile;
