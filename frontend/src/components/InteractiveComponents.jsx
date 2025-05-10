import React from 'react'

// 1. TextField
export function TextField({ value, onChange, placeholder, error, active, ...props }) {
  const base = "w-full px-4 py-2 border rounded-md text-body-m font-sans"
  const stateClasses = error
    ? "border-error focus:border-error focus:ring-error"
    : active
    ? "border-primary focus:border-primary focus:ring-primary"
    : "border-neutral-300 focus:border-primary focus:ring-primary"
  return (
    <div className="space-y-1">
      <input
        type={props.type || 'text'}
        className={`${base} ${stateClasses} focus:outline-none focus:ring-1 ${props.className || ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-error text-body-s">{error}</p>}
    </div>
  )
}

// 2. ButtonPrimary
export function ButtonPrimary({ children, variant = 'default', disabled, className = '', ...props }) {
  const base = "px-6 py-2 rounded-md font-heading text-body-m text-neutral-0"
  const variants = {
    default: "bg-primary hover:bg-primary/90",
    active: "bg-primary-light hover:bg-primary-light/90",
    disabled: "bg-primary-lighter text-neutral-500 cursor-not-allowed",
  }
  return (
    <button
      className={`cursor-pointer ${base} ${variants[variant]}${disabled ? ' opacity-50' : ''} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

// 3. ButtonSecondary
export function ButtonSecondary({ children, variant = 'default', disabled, className = '', ...props }) {
  const base = "px-6 py-2 rounded-md font-heading text-body-m"
  const variants = {
    default: "border border-primary text-primary hover:bg-primary/10",
    active: "border border-primary text-primary hover:bg-primary-light/20",
    disabled: "border border-neutral-300 text-neutral-300 cursor-not-allowed",
  }
  return (
    <button
      className={`cursor-pointer ${base} ${variants[variant]}${disabled ? ' opacity-50' : ''} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export function Tabs({ tabs, activeTab, onChange, renderIcon, className='' }) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={()=>onChange(tab.value)}
          className={`
            cursor-pointer px-4 py-2 rounded-md font-sans text-body-m flex items-center space-x-2
            ${activeTab===tab.value
              ? 'bg-primary text-neutral-0'
              : 'text-neutral-700 hover:text-primary'}
          `}
        >
          {tab.icon && <tab.icon className="w-5 h-5" />}
          {tab.src  && renderIcon(tab.src)}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}


// 5. DropdownField
export function DropdownField({ options, value, onSelect, active, className = '' }) {
  const base = "w-full px-4 py-2 border rounded-md bg-neutral-0 text-body-m font-sans flex justify-between items-center"
  const state = active
    ? 'border-primary focus:border-primary focus:ring-primary'
    : 'border-neutral-300'
  return (
    <div className={`relative ${className}`.trim()}>
      <button
        className={`cursor-pointer ${base} ${state} focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer`.trim()}
        onClick={() => onSelect(null)}
      >
        <span>{value || 'Select...'}</span>
        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul className="absolute mt-1 w-full bg-neutral-0 border border-neutral-300 rounded-md shadow-md z-10">
        {options.map(opt => (
          <li
            key={opt.value}
            className="px-4 py-2 hover:bg-primary-light hover:text-neutral-0 cursor-pointer"
            onClick={() => onSelect(opt.value)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 6. ImageUpload
export function ImageUpload({ src, onUpload, onChange, className = '' }) {
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`.trim()}>
      {src ? (
        <div className="relative">
          <img src={src} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
          <button
            className="absolute inset-0 bg-neutral-900 bg-opacity-50 text-neutral-0 flex items-center justify-center opacity-0 hover:opacity-100 rounded-md cursor-pointer"
            onClick={onChange}
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          className="w-32 h-32 bg-primary-light bg-opacity-30 flex flex-col items-center justify-center rounded-md cursor-pointer"
          onClick={onUpload}
        >
          <img src="/images/icon-upload-image.svg"  className="w-6 h-6" />
          <span className="mt-2 text-body-s text-primary">Upload Image</span>
        </div>
      )}
    </div>
  )
}
