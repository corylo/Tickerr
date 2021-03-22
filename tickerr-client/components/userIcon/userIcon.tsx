import React from "react";

interface UserIconProps {
  image: string;
}

export const UserIcon: React.FC<UserIconProps> = (props: UserIconProps) => {  
  return(
    <img className="tickerr-user-icon" src={props.image} />
  )
}