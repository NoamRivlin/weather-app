import { createIcon } from "@chakra-ui/icons";

export const feranhitIcon = createIcon({
  displayName: "fahrenheitIcon",
  viewBox: "0 0 26 26",
  path: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="26"
      height="26"
    >
      <defs>
        <linearGradient id="a">
          <stop offset="0" stopColor="#24f3d2"></stop>
          <stop offset=".394" stopColor="#0674f0"></stop>
          <stop offset=".507" stopColor="#6961b5"></stop>
          <stop offset=".813" stopColor="#f34660"></stop>
          <stop offset="1" stopColor="#ee078d"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="868.253"
          x2="937.656"
          y1="521.354"
          y2="588.736"
          gradientTransform="matrix(.833 0 0 .833 -718.775 596.81)"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#a"
        ></linearGradient>
      </defs>
      <g transform="translate(0 -1026.362)">
        <rect
          width="26"
          height="26"
          y="1026.362"
          fill="url(#b)"
          rx="5.495"
          ry="5.495"
        ></rect>
        <path
          fill="#fff"
          d="M10.094 1033.737c-.758 0-1.406.618-1.406 1.375 0 .77.635 1.406 1.406 1.406.783 0 1.375-.623 1.375-1.406 0-.77-.604-1.375-1.375-1.375zm0 .688c.384 0 .687.303.687.687 0 .404-.283.719-.687.719a.735.735 0 0 1-.719-.719c0-.371.347-.688.719-.688zm2.437 1.718c-.193 0-.344.182-.344.375v8.125c0 .193.151.344.344.344.193 0 .375-.15.375-.344v-3.718h3.125a.34.34 0 0 0 .344-.344.34.34 0 0 0-.344-.344h-3.125v-3.375h3.344a.34.34 0 0 0 .344-.344c0-.193-.151-.375-.344-.375h-3.719z"
        ></path>
      </g>
    </svg>
  ),
});
