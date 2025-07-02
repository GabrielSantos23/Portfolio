export function MarkName(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 882 540"
      width={props.width ?? 100}
      height={props.height ?? 100}
      {...props}
    >
      <rect y="109.472" width="105.011" height="320.709" fill="currentColor"/>
      <rect x="380.933" y="0.40332" width="108.99" height="275.767" transform="rotate(90.0838 380.933 0.40332)" fill="currentColor"/>
      <rect x="416.916" y="429.959" width="109.668" height="311.745" transform="rotate(90.0838 416.916 429.959)" fill="currentColor"/>
      <rect x="881.069" y="429.255" width="109.668" height="337.407" transform="rotate(90.0838 881.069 429.255)" fill="currentColor"/>
      <rect x="881.069" y="213.557" width="109.668" height="337.407" transform="rotate(90.0838 881.069 213.557)" fill="currentColor"/>
      <rect x="881.069" y="0.696289" width="109.668" height="337.407" transform="rotate(90.0838 881.069 0.696289)" fill="currentColor"/>
      <rect x="648.2" y="109.624" width="109.668" height="104.537" transform="rotate(90.0838 648.2 109.624)" fill="currentColor"/>
      <rect x="417.122" y="213.318" width="109.673" height="174.602" transform="rotate(90.0838 417.122 213.318)" fill="currentColor"/>
      <rect x="417.04" y="318.231" width="112.431" height="107.519" transform="rotate(90.0838 417.04 318.231)" fill="currentColor"/>
      <rect x="881.226" y="213.308" width="215.938" height="107.519" transform="rotate(90.0838 881.226 213.308)" fill="currentColor"/>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M96 128H32V96h64v32ZM224 32h-64v64h64v32h-96V0h96v32ZM32 96H0V32h32v64ZM256 96h-32V32h32v64ZM96 32H32V0h64v32Z"/></svg>`;
}
