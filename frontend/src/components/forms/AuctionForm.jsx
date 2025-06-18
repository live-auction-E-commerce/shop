import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import TimePickerDropdown from '@/components/ui/time-picker-dropdown';

const AuctionForm = ({ form }) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-lg font-medium">Auction Details</div>

          <FormField
            control={form.control}
            name="listing.startingBid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Bid</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listing.expiredAt"
            render={({ field }) => {
              const selectedDate =
                field.value instanceof Date && !isNaN(field.value)
                  ? new Date(field.value)
                  : undefined;

              const timeValue =
                selectedDate && !isNaN(selectedDate)
                  ? `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}`
                  : '23:59';

              const handleDateSelect = (date) => {
                if (date) {
                  const newDateTime = new Date(date);
                  newDateTime.setHours(23, 59, 0, 0); // Default time 23:59
                  field.onChange(newDateTime);
                }
                setDateOpen(false);
              };

              const handleTimeChange = (timeString) => {
                if (timeString === '') {
                  if (selectedDate) {
                    const newDateTime = new Date(selectedDate);
                    newDateTime.setHours(0, 0, 0, 0);
                    field.onChange(newDateTime);
                  }
                  return;
                }

                const [hoursStr = '', minutesStr = ''] = timeString.split(':');
                const hours = hoursStr === '' ? null : Number(hoursStr);
                const minutes = minutesStr === '' ? null : Number(minutesStr);

                const newDateTime = selectedDate ? new Date(selectedDate) : new Date();

                if (hours !== null && !isNaN(hours) && hours >= 0 && hours <= 23) {
                  newDateTime.setHours(hours);
                }

                if (minutes !== null && !isNaN(minutes) && minutes >= 0 && minutes <= 59) {
                  newDateTime.setMinutes(minutes);
                }

                newDateTime.setSeconds(0);
                newDateTime.setMilliseconds(0);

                field.onChange(newDateTime);
              };
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Auction End Date & Time</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      {/* Date Picker */}
                      <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-sm text-muted-foreground">Date</Label>
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'justify-between font-normal',
                                !selectedDate && 'text-muted-foreground'
                              )}
                            >
                              {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                              <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => date < today}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Picker */}
                      <div className="flex flex-col gap-2 w-32">
                        <Label className="text-sm text-muted-foreground">Time</Label>
                        <TimePickerDropdown
                          value={timeValue}
                          onChange={handleTimeChange}
                          open={timeOpen}
                          onOpenChange={setTimeOpen}
                        />
                      </div>
                    </div>
                  </FormControl>
                  {selectedDate && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Auction ends: {format(selectedDate, 'PPP')} at {format(selectedDate, 'p')}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionForm;
