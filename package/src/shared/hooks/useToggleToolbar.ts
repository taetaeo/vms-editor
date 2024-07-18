import React from "react";

export default function useToggleToolbar() {
  const [frameActive, toggleFrameActive] = React.useState<boolean>(true);
  const [pixelActive, togglePixelActive] = React.useState<boolean>(true);
  const [addActive, toggleAddActive] = React.useState<boolean>(true);
  const [textActive, toggleText] = React.useState<boolean>(true);
  const [objectActive, toggleObject] = React.useState<boolean>(true);
  const [previewActive, togglePreview] = React.useState<boolean>(true);
  const [groupActive, toggleGroup] = React.useState<boolean>(true);

  const toggle = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;

    if (id === "text") return toggleText((prev) => !prev);
    else if (id === "frame") return toggleFrameActive((prev) => !prev);
    else if (id === "pixel") return togglePixelActive((prev) => !prev);
    else if (id === "add_object") return toggleAddActive((prev) => !prev);
    else if (id === "object") return toggleObject((prev) => !prev);
    else if (id === "preview") return togglePreview((prev) => !prev);
    else if (id === "group") return toggleGroup((prev) => !prev);
  };

  return { frameActive, pixelActive, addActive, textActive, objectActive, previewActive, groupActive, toggle };
}
