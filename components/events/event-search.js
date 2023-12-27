import { useRef } from "react";
import { getAllEvents } from "../../dummy-data.js";
import Button from "../ui/button";

import styles from "./event-search.module.css";
export default function EventSearch(props) {
  const events = getAllEvents();
  const eventsYear = events.map((event) =>
    event.date.split("-").reverse().pop()
  );
  const eventsMonth = events.map((event) =>
    parseInt(event.date.split("-").splice(1, 1))
  );

  const uniqueYear = [...new Set(eventsYear)];
  const uniqueMonth = [...new Set(eventsMonth)];

  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function eventsMonthToName(month) {
    let monthNumber = month; // Assuming you have the month number, e.g., 2 for March

    // Create a Date object with the desired month (subtract 1 because months are zero-indexed)
    let date = new Date(2000, monthNumber - 1, 1);

    // Use toLocaleString with the 'en-US' locale to get the month name
    let monthName = date.toLocaleString("en-US", { month: "long" });

    return monthName;
  }

  function submitHandler(e) {
    e.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            {uniqueYear.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            {uniqueMonth.map((num, index) => (
              <option key={index} value={num}>
                {eventsMonthToName(num)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
