"use client";

import dynamic from "next/dynamic";

const SphereImage = ({link}) => {
  const ReactPhotoSphereViewer = dynamic(
    () =>
      import("react-photo-sphere-viewer").then(
        (mod) => mod.ReactPhotoSphereViewer
      ),
    {
      ssr: false,
    }
  );
  
  return (
    <div className="rounded-[10px] overflow-hidden mt-10">
      <ReactPhotoSphereViewer
        src={link}
        height="500px"
        width={"100%"}
        // littlePlanet={true}
      />
    </div>
  );
};

export default SphereImage;
