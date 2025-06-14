import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const TimePickerDropdown = ({ value, onChange, open, onOpenChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const [selectedHour, selectedMinute] = value ? value.split(':') : ['23', '59'];

  const handleTimeSelect = (hour, minute) => {
    const timeString = `${hour}:${minute}`;
    onChange(timeString);
    onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn('justify-between font-normal w-full')}>
          {value || '23:59'}
          <ClockIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Hours Column */}
          <div className="border-r">
            <div className="p-2 text-sm font-medium text-center border-b bg-muted/50">Hours</div>
            <div className="max-h-48 overflow-y-auto">
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleTimeSelect(hour, selectedMinute)}
                  className={cn(
                    'w-12 h-8 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center',
                    selectedHour === hour && 'bg-primary text-primary-foreground'
                  )}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>

          {/* Minutes Column */}
          <div>
            <div className="p-2 text-sm font-medium text-center border-b bg-muted/50">Minutes</div>
            <div className="max-h-48 overflow-y-auto">
              {minutes
                .filter((_, i) => i % 5 === 0)
                .map((minute) => (
                  <button
                    key={minute}
                    onClick={() => handleTimeSelect(selectedHour, minute)}
                    className={cn(
                      'w-12 h-8 text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-center',
                      selectedMinute === minute && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {minute}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePickerDropdown;
