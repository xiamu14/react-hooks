import { useState, useEffect } from 'react';

export default function useResetCheck(props: {curInitial:any}, actions: any) {
  const {curInitial} = props;
  const [prevInitial, setInitial] = useState(curInitial);

  useEffect(() => {
    if (prevInitial !== curInitial) {
      actions.reset(true, false);
      /** @desc 缓存 initialValues */
      setInitial(curInitial);
    }
  }, [prevInitial, curInitial, actions])

  return [curInitial]
}
