import React from "react";

const Notification = ({color}) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C16.3402 6.10655 17.8786 8.41425 18 11V14C18.1526 15.2608 18.8949 16.3742 20 17H4C5.10511 16.3742 5.84739 15.2608 6 14V11C6.12137 8.41425 7.65983 6.10655 10 5"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C16.3402 6.10655 17.8786 8.41425 18 11V14C18.1526 15.2608 18.8949 16.3742 20 17H4C5.10511 16.3742 5.84739 15.2608 6 14V11C6.12137 8.41425 7.65983 6.10655 10 5"
          stroke="white"
          stroke-opacity="0.2"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 17V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V17"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 17V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V17"
          stroke="white"
          stroke-opacity="0.2"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.0001 6.727C20.3441 5.30025 19.3916 4.02969 18.2061 3"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.0001 6.727C20.3441 5.30025 19.3916 4.02969 18.2061 3"
          stroke="white"
          stroke-opacity="0.2"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 6.727C3.65535 5.30044 4.60715 4.0299 5.792 3"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 6.727C3.65535 5.30044 4.60715 4.0299 5.792 3"
          stroke="white"
          stroke-opacity="0.2"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Notification;
