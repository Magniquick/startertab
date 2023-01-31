import React from "react";

interface OutlookIconProps {
  fill: string;
  height: number;
  width: number;
}

export const OutlookLogo: React.FC<OutlookIconProps> = ({
  fill,
  height,
  width,
}) => {
  return (
    <svg
      fill={fill}
      height={height}
      width={width}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216 216"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M108,0C48.353,0,0,48.353,0,108s48.353,108,108,108s108-48.353,108-108S167.647,0,108,0z M123.667,73h41.295 c0.356,0,0.141-0.025,0.483,0.029l-41.778,35.429V73z M115.667,161.552c0,3.618-3.134,6.309-6.668,5.534L49.18,153.982 c-2.6-0.57-4.514-2.873-4.514-5.534V64.679c0-2.76,2.117-5.119,4.838-5.584l59.657-10.232c3.461-0.593,6.505,2.073,6.505,5.584 V161.552z M170.667,83.548v53.777c0,3.684-2.021,5.676-5.705,5.676h-41.295v-21.875c0-0.076,46.688-40.351,46.688-40.351 C170.742,81.619,170.667,82.557,170.667,83.548z M89.532,83.583c-7.469-3.902-16.148-2.775-22.683,2.275 c-6.292,4.86-10.213,13.618-10.213,22.143s3.921,17.283,10.213,22.143c2.898,2.239,6.196,3.7,9.629,4.301 c4.335,0.759,8.894,0.146,13.054-2.027c7.942-4.147,12.854-13.167,12.854-24.417C102.386,96.75,97.474,87.732,89.532,83.583z M83.452,120.932c-3.806,2.503-9.001,2.398-12.916-0.128c-4.27-2.756-6.444-8.507-6.444-12.802s2.174-10.046,6.444-12.802 c1.79-1.154,3.843-1.801,5.91-1.926c2.46-0.149,4.943,0.44,7.007,1.796c3.607,2.37,5.477,6.738,5.477,12.932 C88.929,114.194,87.06,118.562,83.452,120.932z"></path>{" "}
      </g>
    </svg>
  );
};
