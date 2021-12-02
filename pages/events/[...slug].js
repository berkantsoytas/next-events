import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import ErrorLoader from "next/dist/build/webpack/loaders/error-loader";

function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>
  }
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return <Fragment>
      <div className="center">
        <ErrorAlert><p>Invalid filter. Please adjust your values!</p></ErrorAlert>
        <Button>Show All Events</Button>
      </div>
    </Fragment>
  }

  const filteredEvent = getFilteredEvents({
    month: numMonth,
    year: numYear
  })

  if (!filteredEvent || filteredEvent.length === 0) {
    return <Fragment>
      <div className="center">
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>
  }

  const date = new Date(numYear, numMonth)
  return <Fragment>
    <ResultsTitle date={date}/>
    <EventList items={filteredEvent}/>
  </Fragment>
}

export default FilteredEventsPage