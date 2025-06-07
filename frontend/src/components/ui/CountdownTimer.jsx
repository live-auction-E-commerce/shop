import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { calculateTimeLeft } from '@/lib/utils';

const CountdownTimer = ({ targetDate, onExpire, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const updateTimer = () => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);

      if (updated.isExpired) {
        onExpire?.();
        clearInterval(timer);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (timeLeft.isExpired) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <Clock className="h-4 w-4" />
        <span className="font-medium">Auction Ended</span>
      </div>
    );
  }

  const isUrgent = timeLeft.days === 0 && timeLeft.hours === 0;

  const timeUnits = [
    { value: timeLeft.days, label: 'd' },
    { value: timeLeft.hours, label: 'h' },
    { value: timeLeft.minutes, label: 'm' },
    { value: timeLeft.seconds, label: 's' },
  ].filter(({ value }) => value > 0);

  return (
    <div
      className={`flex items-center gap-2 ${isUrgent ? 'text-red-600' : 'text-muted-foreground'} ${className}`}
    >
      <Clock className="h-4 w-4" />
      <div className="flex items-center gap-2">
        {timeUnits.length ? (
          timeUnits.map(({ value, label }, i) => (
            <div key={label} className="flex items-center">
              <span className={`font-mono font-medium ${isUrgent ? 'text-red-600' : ''}`}>
                {value}
                {label}
              </span>
              {i < timeUnits.length - 1 && <span className="mx-1">:</span>}
            </div>
          ))
        ) : (
          <span className="font-medium text-red-600">Ending soon...</span>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
