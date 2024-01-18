const ArrowUpIcon = (width, height) => {
  const SVG = styled.svg`
          width: ${width}
          height: ${height}
        `
  return (
    <SVG fill="none" stroke-width="1.5" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      />
    </SVG>
  )
}

const ArrowDownIcon = (width, height) => {
  const SVG = styled.svg`
            width: ${width}
            height: ${height}
          `

  return (
    <SVG fill="none" stroke-width="1.5" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </SVG>
  )
}

return { ArrowUpIcon, ArrowDownIcon }
