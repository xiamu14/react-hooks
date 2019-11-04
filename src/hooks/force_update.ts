import { useState } from "react";

export default function useForceUpdate(): [number, () => void] {
  const [update, setUpdate] = useState(0);

  // NOTE: 强制刷新页面
  function setForceUpdate() {
    const updateTag = update + 1;
    setUpdate(updateTag);
  }
  return [update, setForceUpdate];
}
