import { useState, useEffect } from "react";

export default function useTableBodyHeight(parentRef: any, ...refs: any) {
  /** @desc 表格固定高度 */
  const [tableBodyHeight, setTableBodyHeight] = useState(0);

  useEffect(() => {
    let height = 0;
    if (parentRef.current) {
      height = parentRef.current.clientHeight;

      refs.forEach((ref: any) => {
        height = ref.current ? height - ref.current.clientHeight : height;
      });
      height -= 150; // NOTE:减去底部分页 和表头
      setTableBodyHeight(height);
    }
  }, [parentRef, refs]);

  return {
    tableBodyHeight
  };
}
