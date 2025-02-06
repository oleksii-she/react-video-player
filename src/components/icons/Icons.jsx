export const Checkbox = ({ className }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <rect
        x="0.5"
        y="1.16675"
        width="11"
        height="11"
        rx="3.5"
        stroke="#D1D5DB"
      />
    </svg>
  );
};

export const CheckboxActive = ({ className }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <rect x="0.5" y="0.5" width="11" height="11" rx="3.5" fill="#F43F5E" />
      <rect x="0.5" y="0.5" width="11" height="11" rx="3.5" stroke="#F43F5E" />
      <path
        d="M9.15525 3.59483C9.29585 3.73548 9.37484 3.92621 9.37484 4.12508C9.37484 4.32396 9.29585 4.51469 9.15525 4.65533L5.40525 8.40533C5.2646 8.54594 5.07387 8.62492 4.875 8.62492C4.67613 8.62492 4.4854 8.54594 4.34475 8.40533L2.84475 6.90533C2.70813 6.76388 2.63254 6.57443 2.63424 6.37778C2.63595 6.18114 2.71483 5.99303 2.85389 5.85397C2.99294 5.71491 3.18105 5.63604 3.3777 5.63433C3.57435 5.63262 3.7638 5.70822 3.90525 5.84483L4.875 6.81458L8.09475 3.59483C8.2354 3.45423 8.42613 3.37524 8.625 3.37524C8.82387 3.37524 9.0146 3.45423 9.15525 3.59483Z"
        fill="white"
      />
    </svg>
  );
};

export const DeleteIcons = ({ className }) => {
  return (
    <svg
      width="22px"
      height="22px"
      viewBox="0 0 1024 1024"
      fill="#000000"
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z"
        fill=""
      />
      <path
        d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z"
        fill=""
      />
    </svg>
  );
};

export const IconTrackSwitch = ({ className }) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke="#3E3E45"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
