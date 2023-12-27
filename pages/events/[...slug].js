import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import Button from "../../components/ui/button";
export default function SearchEventPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <>
        <div className="center">
          <p>Invalid filter. Please adjust your values!</p>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <div className="center">
          <p>No events found for the choosen filter!</p>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}
