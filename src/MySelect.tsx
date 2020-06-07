import React, { useState, useEffect } from 'react'

const Origin = () => (
  <select>
    <option>Option 01</option>
    <option>Option 02</option>
    <option>Option 03</option>
    <option>Option 04</option>
    <option>Option 05</option>
  </select>
)

const MyOption = ({
  select,
  selected,
  value,
}: {
  select: (id: string) => void
  selected: boolean
  value: string
}) => {
  const className = selected ? 'option selected' : 'option'
  return (
    <li
      onClick={(e) => {
        e.stopPropagation()
        select(value)
      }}
      className={className}
      id={`${value}`}
    >
      {value}
    </li>
  )
}

export const MySelect = ({ options = [] }: { options?: string[] }) => {
  const [open, isOpen] = useState(false)
  const [selectedIndex, setSelectedindex] = useState(0)
  const [selectedId, setSelectedId] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  let timeoutId: number | null = null

  useEffect(() => {
    setCurrentIndex(selectedIndex)
  }, [selectedIndex])

  const select = (index: number) => (id: string) => {
    isOpen(false)
    setSelectedId(id)
    setSelectedindex(index)
    return
  }

  const keyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open && (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13)) {
      setCurrentIndex(selectedIndex)
      isOpen(true)
      return
    }
    if (e.keyCode === 40) {
      if (currentIndex < options.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
      return
    }
    if (e.keyCode === 38) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
      return
    }
    if (e.keyCode === 13) {
      setSelectedindex(currentIndex)
      isOpen(false)
      return
    }
    if (e.keyCode === 27) {
      isOpen(false)
      return
    }
  }

  return (
    <>
      <Origin />
      <div
        onClick={() => {
          isOpen(true)
        }}
        className="select"
        tabIndex={0}
        onBlur={() => (timeoutId = setTimeout(() => isOpen(false)))}
        onFocus={() => timeoutId && clearTimeout(timeoutId)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={selectedId ? selectedId : ''}
        aria-controls="ex1-listbox"
      >
        <div className="select_label" tabIndex={0} onKeyDown={keyDown}>
          {options[selectedIndex]}
          <span aria-hidden="true">▼</span>
        </div>
        {open && (
          <ul className="options" role="listbox">
            {options.map((option, i) => (
              <MyOption
                key={i}
                selected={i === currentIndex}
                select={select(i)}
                value={option}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
