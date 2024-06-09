import '../../assets/styles/calendar.css';
import { Calendar as ReactCalendar } from 'react-calendar';

export type CalendarProps = React.ComponentProps<typeof ReactCalendar>;

function Calendar({ ...props }: CalendarProps) {
  return <ReactCalendar {...props} />;
}

Calendar.displayName = 'Calendar';

export { Calendar };
