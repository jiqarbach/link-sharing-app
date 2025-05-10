import React, { useState, useEffect } from "react";
import { BaseLayout } from "../layouts/BaseLayout";
import { CustomSelect, PhonePreview } from "../components/common";
import LinkIcon from "/images/icon-link.svg";
import getStartedImage from "/images/illustration-empty.svg";
import { useLinks } from "../hooks/useLinks";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../contexts/AuthContext";

const NewLink = ({ index, link, onRemove, onChange }) => {
  const handlePlatformChange = (platform) => {
    onChange(index, { ...link, platform });
  };
  const handleUrlChange = (e) => {
    onChange(index, { ...link, url: e.target.value });
  };

  return (
    <div className="bg-neutral-100 rounded-[12px] p-[20px] flex flex-col gap-[12px]">
      <div className="flex justify-between text-neutral-700 w-full">
        <span className="flex gap-[8px] items-center">
          <span className="flex flex-col gap-[4px]">
            <span className="h-[1px] w-[12px] bg-gray-100" />
            <span className="h-[1px] w-[12px] bg-gray-100" />
          </span>
          <p className="font-bold">Link #{index + 1}</p>
        </span>
        <button
          onClick={() => onRemove(link.id)}
          className="text-sm hover:text-red-500 cursor-pointer"
        >
          Remove
        </button>
      </div>

      <div className="flex flex-col gap-[4px] w-full">
        <label className="text-[12px]">Platform</label>
        <CustomSelect value={link.platform} onChange={handlePlatformChange} />
      </div>

      <div className="flex flex-col gap-[4px] w-full">
        <label className="text-[12px]">Link</label>
        <span className="relative">
          <img
            src={LinkIcon}
            alt="Link icon"
            className="size-[16px] absolute left-3 inset-y-0 my-auto"
          />
          <input
            type="url"
            value={link.url}
            onChange={handleUrlChange}
            placeholder="e.g. https://github.com/..."
            className="pl-10 px-[16px] py-[12px] w-full text-base text-gray border rounded focus:border-primary"
          />
        </span>
      </div>
    </div>
  );
};

const GetYouStarted = () => (
  <div className="bg-neutral-100 rounded-[12px] p-[20px] h-full flex flex-col gap-[20px] justify-center items-center">
    <img src={getStartedImage} alt="Get Started" className="select-none" />
    <div className="text-center max-w-[488px]">
      <h2 className="text-[24px] md:text-[32px] font-bold leading-[36px] md:leading-[48px] text-gray">
        Let’s get you started
      </h2>
      <p className="text-neutral-700 mt-4">
        Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
      </p>
    </div>
  </div>
);

export default function LinksPage() {
  const { createLink, links, isLoading, deleteLink, updateLink } = useLinks();
  const [localLinks, setLocalLinks] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;
  const { profile } = useProfile();

  useEffect(() => {
    if (Array.isArray(links)) {
      setLocalLinks(
        links.map((link) => ({ id: link.id || Date.now().toString(), ...link }))
      );
    }
  }, [links]);


  const handleAddLink = () => {
    setLocalLinks((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`, 
        platform: '',
        url: '',
        isNew: true
      }
    ]);
  };

  const handleRemoveLink = (id) => {
    setLocalLinks((prev) => prev.filter((link) => link.id !== id));

    // If it's not a new unsaved link, delete from DB too
    const isPersisted = !id.startsWith("temp-");
    if (isPersisted) {
      deleteLink.mutate(id);
    }
  };

  const handleChangeLink = (index, newData) => {
    setLocalLinks((prev) =>
      prev.map((link, i) => {
        const updated = i === index ? { ...link, ...newData } : link;

        // Update in DB if it's an existing link and values changed
        if (!updated.isNew && i === index) {
          const { id, platform, url, order } = updated;
          updateLink.mutate({ id, platform, url, order });
        }

        return updated;
      })
    );
  };

  const handleSave = () => {
    localLinks.forEach((link, index) => {
      if (link.isNew) {
        const { id, isNew, ...data } = link;
        createLink.mutate({ ...data, order: index, user_id: userId });
      }
    });
  };

  const isValid =
    localLinks.length > 0 &&
    localLinks.every((link) => link.platform && link.url);

  return (
    <BaseLayout>
      <section className="flex flex-col lg:flex-row gap-[24px]">
        <div className="hidden lg:flex justify-center items-center bg-white w-full max-w-[400px] xl:max-w-[560px] h-full p-[24px] rounded-[12px]">
          <PhonePreview userData={profile} />
        </div>

        <div className="flex flex-col divide-y-2 w-full">
          <div className="flex flex-col gap-[40px] bg-white p-[24px] lg:p-[40px] rounded-t-[12px]">
            <h2 className="text-[32px] font-bold leading-[48px] text-gray">
              Customize your links
            </h2>
            <p className="text-neutral-700">
              Add/edit/remove links below and then share all your profiles with the world!
            </p>

            <button
              onClick={handleAddLink}
              className="rounded border border-primary hover:bg-primary-200 py-[11px] px-[27px] text-primary font-semibold cursor-pointer"
            >
              + Add new link
            </button>

            <div className="max-h-[489px] overflow-y-auto flex flex-col gap-[24px]">
              {localLinks.length === 0 ? (
                <GetYouStarted />
              ) : (
                localLinks.map((link, index) => (
                  <NewLink
                    key={link.id}
                    index={index}
                    link={link}
                    onRemove={handleRemoveLink}
                    onChange={handleChangeLink}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end bg-white p-[16px] md:p-[24px] rounded-b-[12px]">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isValid || createLink.isLoading}
              className="text-white font-semibold text-base bg-primary px-[27px] py-[11px] rounded disabled:bg-opacity-25 cursor-pointer"
            >
              {createLink.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}