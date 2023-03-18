import React, { useEffect, useState } from "react";
import "./index.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isTimeInc, setIsTimeInc] = useState(false);
  const [splitTime, setSplitTime] = useState();
  const [artists, setArtists] = useState([]);
  const [status, setStatus] = useState();


  let nextId = 0;

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time / 100;

  useEffect(() => {
    let timeInterval;
    if (isTimeInc) {
      timeInterval = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(timeInterval);
  }, [isTimeInc, time]);

  const splitList =()=>{
    artists.push({
        id: artists.length,
        splitTime: splitTime,
        status:status
      });

  }

  const reStart = () => {
    console.log("restart Called", artists.length,nextId);
    setIsTimeInc(!isTimeInc);
    setStatus(isTimeInc ? "Pause" : "");
    setSplitTime(time);
    splitList();
  };
  const reSet = () => {
    console.log("reset Called");
    setTime(0);
  };
  const timeSplit = () => {
    console.log("split time", artists , nextId);
    setSplitTime(time);
    setStatus("Split");
    splitList();
  };

  return (
    <div className="watchContainer">
      <header>
        <nav>Stopwatch</nav>
      </header>
      <section className="timer">
        <h1>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </h1>
      </section>
      <section>
        <p>Split Time </p>
        <button className="restart" onClick={reStart}>
          Restart
        </button>
        <button className="split" onClick={timeSplit}>
          Split
        </button>
        <button className="reset" onClick={reSet}>
          Reset
        </button>
       
      </section>
      {/* <ol>{splitTime}</ol> */}
      <ol>
      {artists.map(artist => (
          <li key={artist.id}>{artist.id}{artist.splitTime} {artist.status}</li>
        ))}
      </ol>
      
       
     
     
    </div>
  );
};

export default Stopwatch;
