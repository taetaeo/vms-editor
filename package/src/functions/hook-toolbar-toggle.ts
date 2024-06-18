import React from "react";
export default function useToolbarToggle() {
  const [textActive, toggleText] = React.useState<boolean>(true);
  const [objectActive, toggleObject] = React.useState<boolean>(true);
  const [previewActive, togglePreview] = React.useState<boolean>(true);
  const [groupActive, toggleGroup] = React.useState<boolean>(true);

  const toggle = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;

    if (id === "text") return toggleText((prev) => !prev);
    else if (id === "object") return toggleObject((prev) => !prev);
    else if (id === "preview") return togglePreview((prev) => !prev);
    else if (id === "group") return toggleGroup((prev) => !prev);
  };

  return { textActive, objectActive, previewActive, groupActive, toggle };
}
