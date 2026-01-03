import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isBefore, isAfter } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TripStatus = 'Ongoing' | 'Upcoming' | 'Completed' | 'Draft';

export function getTripStatus(startDate: Date, endDate: Date, isPublic: boolean): TripStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    if (!isPublic) {
        return 'Draft';
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    if (isBefore(today, start)) {
        return 'Upcoming';
    } else if (isAfter(today, end)) {
        return 'Completed';
    } else {
        return 'Ongoing';
    }
}
