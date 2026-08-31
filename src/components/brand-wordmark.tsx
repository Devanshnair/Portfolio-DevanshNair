export function BrandWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 2048 256"
      {...props}
    >
      <text
        x="0"
        y="60%"
        dominantBaseline="central"
        fontSize="160"
        fontWeight="900"
        fill="currentColor"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "-0.05em",
        }}
      >
        devanshnair
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 2048 256"><text x="0" y="60%" dominant-baseline="central" font-size="160" font-weight="900" fill="currentColor" font-family="monospace">devanshnair</text></svg>`
}
