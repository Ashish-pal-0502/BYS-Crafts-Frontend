import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeChild from "./MarqueeChild";
const Marquees = () => {
  return (
    <>
      <Marquee className="gap-3">
        <MarqueeChild title="◉ No Sulphates" />
        <MarqueeChild title=" ◉ No Parabens" />
        <MarqueeChild title="◉ No Preservatives" />
        <MarqueeChild title="◉ No Harsh Chemicals" />
        <MarqueeChild title="◉ No Harsh Chemicals" />
      </Marquee>
    </>
  );
};

export default Marquees;
