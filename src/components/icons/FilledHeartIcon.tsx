import React from "react";

interface FilledHeartIconProps {}

export const FilledHeartIcon: React.FC<FilledHeartIconProps> = ({}) => {
  return (
    <svg width="18" height="20" viewBox="0 0 128 128">
      <path
        d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z"
        fill="#DB4437"
      />
    </svg>
  );
};
