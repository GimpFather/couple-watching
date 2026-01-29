import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'
import localeData from 'dayjs/plugin/localeData'
import updateLocale from 'dayjs/plugin/updateLocale'
import NBIconButton from "../NeoBrutalism/NBIconButton";
import { CalendarCheckIcon, CaretRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

dayjs.extend(weekday)
dayjs.extend(isoWeek)
dayjs.extend(localeData)
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
    weekdaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});

const DAY_SIZE = 42;
const HEADER_HEIGHT = 32;

type WatchedDateInputProps = {
    selectedDate: dayjs.Dayjs;
    setSelectedDate: (date: dayjs.Dayjs) => void;
};

const WatchedDateInput = ({ selectedDate, setSelectedDate }: WatchedDateInputProps) => {
    const { palette } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const handleMonthClick = (direction: 'next' | 'previous') => {
        setCurrentMonth(direction === 'next' ? currentMonth.add(1, 'month') : currentMonth.subtract(1, 'month'));
    };

    const handleExpend = () => {
        setIsExpanded(prev => !prev);
    };


    const handleDateClick = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        setIsExpanded(prev => !prev);
    };

    const weeks = useMemo(() => {
        const startDate = currentMonth.startOf('month').startOf('isoWeek');

        return Array.from({ length: 6 }, (_, weekIndex) =>
            Array.from({ length: 7 }, (_, dayIndex) => {
                const date = startDate.add(weekIndex * 7 + dayIndex, 'day');

                return {
                    date,
                    day: date.date(),
                    isCurrentMonth: date.month() === currentMonth.month(),
                };
            })
        );
    }, [currentMonth]);


    return (
        <>
            <Box sx={{ border: `1.5px solid ${palette.common.black}`, padding: '11.5px 0px', borderRadius: '16px' }}>
                <Stack direction="row" alignItems="center" justifyContent='space-between' sx={{ padding: '0px 12px' }} onClick={handleExpend}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <CalendarCheckIcon size={20} />
                        <Typography variant="emphasizedBodyMedium">Watched date</Typography>
                    </Stack>
                    <Typography variant="bodyMedium" sx={{ fontWeight: 700 }}>
                        {selectedDate.format('DD.MM.YYYY')}
                    </Typography>
                </Stack>
                <AnimatePresence mode="wait" initial={true}>
                    {isExpanded && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}>
                            <Divider sx={{ marginY: 1, backgroundColor: palette.common.black, height: 1.5 }} />
                            <Stack direction="row" justifyContent='space-between' alignItems='center' sx={{ padding: '8px 12px' }}>
                                <NBIconButton onClick={() => handleMonthClick('previous')} icon={<CaretRightIcon size={20} style={{ transform: 'rotate(180deg)' }} />} />
                                <Typography variant="headingSmall" sx={{ marginBottom: '4px' }}>{currentMonth.format('MMMM YYYY')}</Typography>
                                <NBIconButton onClick={() => handleMonthClick('next')} icon={<CaretRightIcon size={20} />} />
                            </Stack>
                            <Stack direction="column" justifyContent='center' alignItems='center' sx={{ padding: '0px 12px' }}>
                                <Stack direction="row">
                                    {dayjs.weekdaysShort().map(d => (
                                        <Typography variant="headingExtraSmall" key={d} sx={{ width: DAY_SIZE, height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.accent[600], fontWeight: 700, textTransform: 'uppercase' }}>{d}</Typography>
                                    ))}
                                </Stack>
                                {weeks.map((week, i) => (
                                    <Stack direction="row" key={i}>
                                        {week.map((day, i) => {
                                            const isCurrentMonth = day.date.month() === currentMonth.month();
                                            const isSelected = day.date.isSame(selectedDate, 'day');

                                            return (
                                                <Typography onClick={() => handleDateClick(day.date)} variant="bodyLarge" key={i} sx={{ width: DAY_SIZE, height: DAY_SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', color: isCurrentMonth ? palette.common.black : palette.accent[200], ...(isSelected && { border: `1.5px solid ${palette.common.black}`, borderRadius: '50%', backgroundColor: palette.accent[100], color: palette.common.black }) }}>{day.day}</Typography>)
                                        })}
                                    </Stack>
                                ))}
                            </Stack>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </>
    );
};

export default WatchedDateInput;