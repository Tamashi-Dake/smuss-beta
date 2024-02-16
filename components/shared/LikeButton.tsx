"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface LikeButtonProps {
  playlistId: string;
}

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div>
      <Button className="" onClick={handleLike}>
        Like
      </Button>
    </div>
  );
};

export default LikeButton;
