import { useEffect, useMemo} from "react";
import { 
  ChakraProvider, 
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Button,
  Text,
  HStack,
  Box, 
  extendTheme,
} from '@chakra-ui/react'
import Afspraken from "./Afspraken";
import { CalendarViewType, useCalendar, } from "@h6s/calendar";
import { format, getDate, isToday, parseISO } from "date-fns";
import { useThemeColors } from '../../contexts/Theme.context';
import "../../index.css";

const themes = {
  light: extendTheme({
    colors: {
      bg: "gray.100",
      text: "gray.800",
    },
    styles: {
      global: {
        body: {
          bg: "gray.100",
          color: "gray.800",
        },
      },
    },
  }),
  dark: extendTheme({
    colors: {
      bg: "gray.800",
      text: "whiteAlpha.900",
    },
    styles: {
      global: {
        body: {
          bg: "gray.800",
          color: "whiteAlpha.900",
        },
      },
    },
  }),
};

export default function AfsprakenTable({ afspraken, selectedDate, onDelete }) {
  const { theme } = useThemeColors();

  // Sorteer afspraken op datum en tijd
  const sortedAfspraken = useMemo(() => {
    return afspraken.sort((a, b) => new Date(a.date_StartTime) - new Date(b.date_StartTime));
  }, [afspraken]);

  // Als er nog geen afspraken zijn, toont het dit.
  if (afspraken.length === 0) {
    return (
         <div className="alert alert-info" data-cy="no_afspraken_message">Er zijn nog geen afspraken.</div>
      );
  }
  
  // Gebruik van de kalender
  const { headers, body, month, year, navigation } = useCalendar({
    defaultViewType: CalendarViewType.Week
  });

  // Groepeer afspraken per dag
  const groupedAfspraken = useMemo(() => {
    return sortedAfspraken.reduce((acc, afspraak) => {
      const dateKey = format(parseISO(afspraak.date_StartTime), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(afspraak);
      return acc;
    }, {});
  }, [sortedAfspraken]);

  useEffect(() =>  {
    if (selectedDate) {
      const date = parseISO(selectedDate);
      navigation.setDate(date);
    }
  }, [selectedDate, navigation]);

  return (
    <ChakraProvider theme={themes[theme]}>
      <>
        <HStack justify="space-between">
          <HStack>
            <Button onClick={navigation.toPrev}>&lt;</Button>
            <Text className={`date-calender text${theme}`}>{format(new Date(year, month), "MMM yyyy")}</Text>
            <Button onClick={navigation.toNext}>&gt;</Button>
          </HStack>
          <Button onClick={navigation.setToday}>Vandaag</Button>
        </HStack>
        <Table>
          <Thead>
            <Tr>
              {headers.weekDays.map(({ key, value }) => {
              return <Th key={key} textAlign="center" >{format(value, "E")}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
          {body.value.map(({ key, value: days }) => (
            <Tr key={key}>
              {days.map(({ key, value }) => {
                const dateKey = format(value, 'yyyy-MM-dd');
                return (
                  <Td key={key} textAlign="center" color={isToday(value) ? "red.500" : "inherit"}>
                    <Box>
                      {getDate(value)}
                      <Box mt={2}>
                        {groupedAfspraken[dateKey] ? (
                          groupedAfspraken[dateKey].map(afspraak => (
                            <Afspraken
                              {...afspraak}
                              key={afspraak.id}
                              onDelete={onDelete}
                            />
                          ))
                        ) : null}
                      </Box>
                    </Box>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
        </Table>
      </>
    </ChakraProvider>
  );
}