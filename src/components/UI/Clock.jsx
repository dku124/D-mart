import { isCursorAtEnd } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Clock = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let interval; {/*biến interval này có thể được sử dụng ở một hàm khác, nên dùng let :)*/}

  const countDown = () => {
    const destination = new Date('Dec 30, 2022').getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const different = destination - now;

      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      const hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((different % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    countDown();
  });
  return (
    <div className="clock__wrapper d-flex align-item-centen gap-3">
      <div className="clock__data d-flex align-item-centen gap-3">
        <div className="text-center text-white">
          <h1 className="fs-3">{days}</h1>
          <h5 className="fs-6 mt-1">Days</h5>
        </div>
        <span className="d-inline-block text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-item-centen gap-3">
        <div className="text-center text-white">
          <h1 className="fs-3">{hours}</h1>
          <h5 className="fs-6 mt-1">Hours</h5>
        </div>
        <span className="d-inline-block text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-item-centen gap-3">
        <div className="text-center text-white">
          <h1 className="fs-3">{minutes}</h1>
          <h5 className="fs-6 mt-1">Minutes</h5>
        </div>
        <span className="d-inline-block text-white fs-3">:</span>
      </div>

      <div className="clock__data d-flex align-item-centen gap-3">
        <div className="text-center text-white">
          <h1 className="fs-3">{seconds}</h1>
          <h5 className="fs-6 mt-1">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
