import React from 'react';
import Preview from '/images/mobile-preview.svg';
import Avatar from '/images/avatar.jpeg';
import PlatformLinks from './PlatformLinks';

const PhonePreview = ({ userData }) => {
  const fullName = userData?.first_name || userData?.last_name
    ? `${userData?.first_name || ''} ${userData?.last_name || ''}`.trim()
    : 'John Doe';
  const email = userData?.email || 'email@example.com';
  const avatar = userData?.avatar || Avatar;

  return (
    <div className="relative flex justify-center items-center">
      <img src={Preview} alt="Phone Preview" className="select-none" />

      <div className="flex flex-col gap-[46px] absolute bottom-8">
        {/* actual profile image and links */}
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
              {fullName}
            </h2>
            <p className="text-neutral-700">{email}</p>
          </span>
        </div>

        <div className="flex flex-col gap-[15px] max-h-[280px] overflow-scroll">
          <PlatformLinks />
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
