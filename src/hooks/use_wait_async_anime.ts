import { useState, useEffect } from 'react';

/**
 * @description 等待异步事件反馈的动画 hook
 * @param delay 动画延迟时间, 单位 秒
 * @param cycle 动画周期，单位 秒
 * @description 状态描述图 https://gitmind.com/app/flowchart/60c363951
 */
export default function useWaitAsyncAnime(delay: number, cycle: number) {
  // 预启动动画标识
  const [tag, setTag] = useState(false);
  const [isPlay, setIsPlay] = useState(false); // 动画运行标识
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tag) {
      timer = setTimeout(() => {
        clearTimeout(timer);

        if (tag) {
          setIsPlay(true);
          setStartTime(Date.now());
        }
      }, delay * 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [tag, delay]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!tag && isPlay) {
      if (Date.now() - startTime < cycle * 1000) {
        const duration = cycle * 1000 - (Date.now() - startTime);
        timer = setTimeout(() => {
          clearTimeout(timer);

          setIsPlay(false);
        }, duration);
      } else {
        setIsPlay(false);
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [tag, isPlay, cycle, startTime]);

  return { isPlay, setIsPlay, tag, setTag };
}
