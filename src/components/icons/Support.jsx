import React from "react";

const Support = ({color}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="4"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="white"
        stroke-opacity="0.2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="16"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="16"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="white"
        stroke-opacity="0.2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 15V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V15"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 15V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V15"
        stroke="white"
        stroke-opacity="0.2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 19C18 20.6569 15.3137 22 12 22"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 19C18 20.6569 15.3137 22 12 22"
        stroke="white"
        stroke-opacity="0.2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Support;
