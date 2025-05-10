import React, { useState } from 'react'
import { Tabs, ButtonSecondary } from './InteractiveComponents'

export default function TopBar() {
  const [activeTab, setActiveTab] = useState('links')

  return (
    <div className="bg-neutral-0 rounded-t-lg overflow-hidden">
      <div
        className="
          mx-auto max-w-[1440px] h-[126px] px-6
          flex items-center justify-between
        "
      >
        {/* Logo + Title */}
        <div className="flex items-center space-x-4">
          <img src="/images/logo-devlinks-small.svg" alt="devlinks" className="w-6 h-6" />
          <span className="font-heading text-heading-s font-semibold text-neutral-900">
            devlinks
          </span>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { value: 'links', label: 'Links', src: '/images/icon-links-header.svg' },
            { value: 'profile', label: 'Profile Details', src: '/images/icon-profile-details-header.svg' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          renderIcon={url => <img src={url} alt="" className="w-5 h-5" />}
        />

        {/* Preview button */}
        <ButtonSecondary variant="default" className="px-6 py-2 rounded-lg cursor-pointer">
          Preview
        </ButtonSecondary>
      </div>
    </div>
  )
}
