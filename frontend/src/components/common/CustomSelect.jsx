import React from "react";
import * as Select from "@radix-ui/react-select";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";

import Codepen from "/images/icon-codepen.svg";
import Codewars from "/images/icon-codewars.svg";
import DevTo from "/images/icon-devto.svg";
import Facebook from "/images/icon-facebook.svg";
import Freecodecamp from "/images/icon-freecodecamp.svg";
import FrontendMentor from "/images/icon-frontend-mentor.svg";
import GitHub from "/images/icon-github.svg";
import GitLab from "/images/icon-gitlab.svg";
import Hashnode from "/images/icon-hashnode.svg";
import LinkedIn from "/images/icon-linkedin.svg";
import StackOverflow from "/images/icon-stack-overflow.svg";
import Twitch from "/images/icon-twitch.svg";
import Twitter from "/images/icon-twitter.svg";
import YouTube from "/images/icon-youtube.svg";

const options = [
  { label: "GitHub", Icon: GitHub },
  { label: "Frontend Mentor", Icon: FrontendMentor },
  { label: "Twitter", Icon: Twitter },
  { label: "LinkedIn", Icon: LinkedIn },
  { label: "YouTube", Icon: YouTube },
  { label: "Facebook", Icon: Facebook },
  { label: "Twitch", Icon: Twitch },
  { label: "Dev.to", Icon: DevTo },
  { label: "Codewars", Icon: Codewars },
  { label: "Codepen", Icon: Codepen },
  { label: "freeCodeCamp", Icon: Freecodecamp },
  { label: "GitLab", Icon: GitLab },
  { label: "Hashnode", Icon: Hashnode },
  { label: "Stack Overflow", Icon: StackOverflow },
];

const CustomSelect = ({ value, onChange }) => {
  const selected = options.find((o) => o.label === value);
  const SelectedIcon = selected?.Icon || null;

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="inline-flex items-center justify-between px-[16px] py-[12px] text-base text-gray bg-white border rounded focus:border-primary">
        <div className="flex items-center gap-2">
          {SelectedIcon && <img src={SelectedIcon} className="size-5" alt="icon" />}
          <Select.Value placeholder="Select a platform..." />
        </div>
        <BiChevronDown className="size-6 text-primary" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="border border-gray-200 bg-white rounded">
          <Select.ScrollUpButton className="flex justify-center h-8">
            <BiChevronUp className="text-primary" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-2">
            <Select.Group>
              {options.map((option) => (
                <SelectItem
                  key={option.label}
                  value={option.label}
                  icon={option.Icon}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex justify-center h-8">
            <BiChevronDown className="text-primary" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(({ children, value, icon, ...props }, ref) => (
  <Select.Item
    ref={ref}
    value={value}
    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary-200 hover:text-primary"
    {...props}
  >
    <img src={icon} alt="icon" className="size-5" />
    <Select.ItemText>{children}</Select.ItemText>
    <Select.ItemIndicator className="ml-auto">
      <BiCheck className="text-primary" />
    </Select.ItemIndicator>
  </Select.Item>
));

SelectItem.displayName = "SelectItem";
export default CustomSelect;