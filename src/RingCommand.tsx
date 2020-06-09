import React, { useState, useEffect } from 'react'

const MyOption = ({
  select,
  selected,
  value,
  transform,
}: {
  select: (id: string) => void
  selected: boolean
  value: string
  transform: string
}) => {
  const className = selected ? 'ring-option ring-selected' : 'ring-option'
  return (
    <g
      transform={transform}
      onClick={(e) => {
        e.stopPropagation()
        select(value)
      }}
      className={className}
      id={`${value}`}
      role="option"
      aria-selected={selected}
    >
      <text
        fontSize={70}
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    </g>
  )
}

export const RingCommand = ({ options = [] }: { options?: string[] }) => {
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

  const keyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (!open && (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13)) {
      setCurrentIndex(selectedIndex)
      isOpen(true)
      return
    }
    if (e.keyCode === 40 || e.keyCode === 39) {
      if (currentIndex < options.length - 1) {
        setCurrentIndex(currentIndex + 1)
        return
      }
      setCurrentIndex(options.length - 1 - currentIndex)
      return
    }
    if (e.keyCode === 38 || e.keyCode === 37) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        return
      }
      setCurrentIndex(options.length - 1 + currentIndex)
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

  const pie = (idx: number) => {
    const max = options.length
    const dst = open ? 100 : 350
    const offset = (max - currentIndex) / max - 0.25
    const x = Math.cos((idx / max + offset) * 3.14 * 2) * dst
    const y = Math.sin((idx / max + offset) * 3.14 * 2) * dst
    return `translate(${x}, ${y})`
  }

  return (
    <>
      <svg
        onClick={() => {
          isOpen(true)
        }}
        width="400"
        height="400"
        className="ring-select"
        tabIndex={0}
        onBlur={() => (timeoutId = setTimeout(() => isOpen(false)))}
        onFocus={() => timeoutId && clearTimeout(timeoutId)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={selectedId ? selectedId : ''}
        aria-controls="ex1-listbox"
        onKeyDown={keyDown}
      >
        <g>
          <text
            x={200}
            y={200}
            textAnchor={'middle'}
            dominantBaseline="central"
            fontSize={open ? 20 : 80}
            style={{ transition: 'all 0.3s' }}
          >
            {options[selectedIndex]}
          </text>
        </g>
        <g
          role="listbox"
          aria-hidden={!open}
          transform="translate(200,200)"
        >
          {options.map((option, i) => (
            <MyOption
              key={i}
              selected={i === currentIndex}
              select={select(i)}
              value={option}
              transform={pie(i)}
            />
          ))}
        </g>
      </svg>
    </>
  )
}
