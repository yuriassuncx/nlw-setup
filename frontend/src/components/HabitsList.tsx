import * as Checkbox from '@radix-ui/react-checkbox';

import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { api } from '../lib/axios';
import dayjs from 'dayjs';
import { useApplication } from '../hooks/useApplication';

interface HabitsListProps {
    date: Date;
    onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>;
    completedHabits: string[];
}

export function HabitsList({ date, onCompletedChange }: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
    
    const { user } = useApplication();

    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString(),
            },
        }).then((response) => {
            setHabitsInfo(response.data);
        })
    }, []);

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`);
        
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId];
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        });

        onCompletedChange(completedHabits.length);
    }

    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date());

    return (
        <div className="flex flex-col mt-6 gap-3">
            {habitsInfo?.possibleHabits.map((habit) => (
                <Checkbox.Root
                    key={habit.id}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    defaultChecked={habitsInfo.completedHabits.includes(habit.id)}
                    disabled={isDateInPast || !user}
                    className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
                >
                    <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                        <Checkbox.Indicator>
                            <Check size={20} className="text-white" />
                        </Checkbox.Indicator>
                    </div>

                    <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                        {habit.title}
                    </span>
                </Checkbox.Root>
            ))}
        </div>
    )
}