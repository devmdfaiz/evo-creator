"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/utils";
import { DateContext } from "@/context/DateProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = React.useContext(DateContext);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-card rounded-sm",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="flex w-auto flex-col space-y-2 p-2"
          align="start"
        >
          <Select
            onValueChange={(value) =>
              setDate({
                from: addDays(new Date(), -parseInt(value)),
                to: addDays(new Date(), 0),
                type: "template",
                templateData: {
                  day:
                    parseInt(value) === 2
                      ? "yesterday"
                      : parseInt(value) === 1
                      ? "today"
                      : format(
                          addDays(new Date(), -parseInt(value)),
                          "dd/MM/yyyy"
                        ),
                  todayDate: format(new Date(), "dd/MM/yyyy"),
                  yesterdayDate: format(addDays(new Date(), -1), "dd/MM/yyyy"),
                },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="2">Yesterday</SelectItem>
              <SelectItem value="3">In last 3 days</SelectItem>
              <SelectItem value="30">In last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
