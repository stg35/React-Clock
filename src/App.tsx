import React, { useEffect, useState } from "react";
import { Clock } from "./components";
import { ITime } from "./interfaces/time.interface";
import axios from "axios";
import { parseISO } from "date-fns";
import { ClockProps } from "./components/Clock/Clock.props";

export default function App(): JSX.Element {
  const [timeState, setTimeState] = useState<ClockProps>();

  useEffect(() => {
    setInterval(() => {
      (async () => {
        try {
          const { data } = await axios.get<ITime>(
            "https://worldtimeapi.org/api/ip"
          );
          const time = parseISO(data.datetime as string);
          setTimeState({
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds()
          });
        } catch {
          throw new Error("Не удалось получить время");
        }
      })();
    }, 1000);
  }, []);

  return <div>{timeState && <Clock {...timeState} />}</div>;
}
