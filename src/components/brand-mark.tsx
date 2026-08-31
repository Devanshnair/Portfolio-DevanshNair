export function BrandMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M32 0h64v256H32z M96 0h96v64H96z M96 192h96v64H96z M192 64h64v128H192z M320 0h64v256h-64z M448 0h64v256h-64z M384 64h32v64h-32z M416 128h32v64h-32z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="currentColor" d="M16 0h32v128H16z M48 0h48v32H48z M48 96h48v32H48z M96 32h32v64H96z M160 0h32v128h-32z M224 0h32v128h-32z M192 32h16v32h-16z M208 64h16v32h-16z"/></svg>`
}
