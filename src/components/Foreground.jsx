import React, { useRef } from "react";
import Card from "./Card";

function Foreground() {
  // const data =[
  // icon, desc,filesize, closeOrDownload,tagDetails
  // ];
  const ref = useRef(null);
  const data = [
    {
      desc: "This data is written here and updated on the card",
      filesize: ".9 mb",
      close: false,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
    {
      desc: "The data needs to be updloaded on the cloud",
      filesize: "1 mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Upload Now",
        tagColor: "blue",
      },
    },
    {
      desc: "What is this behaviour?",
      filesize: ".5 mb",
      close: true,
      tag: {
        isOpen: true,
        tagTitle: "Download Now",
        tagColor: "green",
      },
    },
  ];

  return (
    <div
      // ref={ref}
      ref={ref}
      className="fixed z-[3] top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5 "
    >
      {data.map((item, index) => (
        <Card data={item} reference={ref} />
      ))}
    </div>
  );
}

export default Foreground;
