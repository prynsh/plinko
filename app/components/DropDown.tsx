import React, { useState } from "react"

interface DropdownOption<T> {
  label: string
  value: T
}

interface DropdownProps<T> {
  label?: string
  options: DropdownOption<T>[]
  onSelect: (value: T) => void
  selected?: T
}

export function Dropdown<T extends string | number>({
  label,
  options,
  onSelect,
  selected,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (value: T) => {
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-64">
      {label && <div className="mb-1 text-gray-700">{label}</div>}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border rounded-lg p-2 bg-black text-left shadow-sm"
      >
        {options.find((opt) => opt.value === selected)?.label || "Select..."}
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 bg-black border rounded-lg shadow-md z-10">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => handleSelect(opt.value)}
              className="p-2  cursor-pointer"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
