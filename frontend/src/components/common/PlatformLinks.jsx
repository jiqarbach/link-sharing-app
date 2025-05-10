import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { useLinks } from '../../hooks/useLinks';

import Codepen from '/images/icon-codepen.svg';
import Codewars from '/images/icon-codewars.svg';
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

// Visual styles and icons per platform
const options = [
  { label: 'GitHub', Icon: GitHub, color: '#1A1A1A', border: 'border', text: 'text-white' },
  { label: 'Frontend Mentor', Icon: FrontendMentor, color: '', border: 'border border-gray-200', text: 'text-gray' },
  { label: 'Twitter', Icon: Twitter, color: '#43B7E9', border: 'border', text: 'text-white' },
  { label: 'LinkedIn', Icon: LinkedIn, color: '#2D68FF', border: 'border', text: 'text-white' },
  { label: 'YouTube', Icon: YouTube, color: '#EE3939', border: 'border', text: 'text-white' },
  { label: 'Facebook', Icon: Facebook, color: '#2442AC', border: 'border', text: 'text-white' },
  { label: 'Twitch', Icon: Twitch, color: '#EE3FC8', border: 'border', text: 'text-white' },
  { label: 'Dev.to', Icon: DevTo, color: 'gray', border: 'border', text: 'text-white' },
  { label: 'Codewars', Icon: Codewars, color: '#8A1A50', border: 'border', text: 'text-white' },
  { label: 'Codepen', Icon: Codepen, color: '#000000', border: 'border', text: 'text-white' },
  { label: 'freeCodeCamp', Icon: Freecodecamp, color: '#302267', border: 'border', text: 'text-white' },
  { label: 'GitLab', Icon: GitLab, color: '#EB4925', border: 'border', text: 'text-white' },
  { label: 'Hashnode', Icon: Hashnode, color: '#0330D1', border: 'border', text: 'text-white' },
  { label: 'Stack Overflow', Icon: StackOverflow, color: '#EC7100', border: 'border', text: 'text-white' },
];

const PlatformLinks = () => {
  const { links = [], isLoading, isError } = useLinks();
  if (isLoading) return <p>Loading links...</p>;
  if (isError) return <p>Failed to load links</p>;

  return (
    <>
      {links
        .filter(link => link.url && link.platform)
        .map((link) => {
          const option = options.find(opt => opt.label === link.platform);
          if (!option) return null;

          return (
            <Link
              key={link.id}
              to={link.url}
              className={`w-[237px] h-[56px] p-[16px] rounded text-white flex items-center gap-[8px] justify-between ${option.border} group`}
              style={{ backgroundColor: option.color }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={option.Icon} className="size-6" alt={link.platform} />
              <div className={`${option.text} flex-1`}>{option.label}</div>
              <LuArrowRight className={`size-[16px] ${option.text} group-hover:translate-x-1 duration-200`} />
            </Link>
          );
        })}
    </>
  );
};

export default PlatformLinks;
