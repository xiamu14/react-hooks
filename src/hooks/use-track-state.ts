import { useState, useEffect } from "react";

export default function useTrackState(props: {
  curInitial: any;
  callback: Function;
}) {
  const { curInitial, callback } = props;
  const [prevInitial, setInitial] = useState(curInitial);

  useEffect(() => {
    if (prevInitial !== curInitial) {
      callback();
      /** @desc 缓存 initialValues */
      setInitial(curInitial);
    }
  }, [prevInitial, curInitial, callback]);
}
