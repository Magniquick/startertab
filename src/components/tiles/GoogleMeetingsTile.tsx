import { GoogleIcon } from "@/components/icons";
import { GoogleCalendarLogo } from "@/components/icons/GoogleCalendarLogo";
import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { MeetingCard } from "@/components/ui/MeetingCard";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { GoogleContext } from "@/context/GoogleContext";
import { GoogleContextInterface } from "@/types";
import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Center, Link, Text } from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";

interface GoogleFeedTileProps {
  tileId: number;
}

export const GoogleMeetingsTile: React.FC<GoogleFeedTileProps> = ({
  tileId,
}) => {
  const color = `var(--text-color-${tileId})`;

  const { isAuthenticated, googleData, loginWithGoogle, isLoading, error } =
    useContext(GoogleContext) as GoogleContextInterface;
  const divRef = useRef<HTMLDivElement | null>(null);
  let renderedNextMeetingLine = false;
  const [tileWidth, setTileWidth] = useState(0);
  const [previousWidth, setPreviousWidth] = useState(0);

  // need to change the amount of text truncated from title depending on width
  if (divRef.current) {
    if (divRef.current.offsetWidth !== previousWidth) {
      setPreviousWidth(divRef.current.offsetWidth);
      setTileWidth(divRef.current.offsetWidth);
    }
  }

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithGoogle}
          color="gray.700"
          // borderColor="black"
          shadow="lg"
          background="white !important"
        >
          <Box mr="4">
            <GoogleIcon height={22} width={22} />
          </Box>
          Sign in with Google
        </OutlinedButton>
      </Center>
    );
  }

  let display;

  if (isLoading && isAuthenticated !== undefined) {
    display = <TextFeedSkeleton />;
  } else if (error) {
    display = (
      <Box mt="6" textAlign="center" px="2">
        <Text>There was an error fetching the Google data.</Text>
        <br />
        <Text>
          If this error continues to persist, please open a{" "}
          <Link
            target="_top"
            style={{ textDecoration: "underline" }}
            href="https://github.com/allister-grange/startertab/issues"
          >
            GitHub issue
          </Link>
          .
        </Text>
      </Box>
    );
  } else if (googleData) {
    googleData.sort(
      (a, b) =>
        new Date(a.start.dateTime).getTime() -
        new Date(b.start.dateTime).getTime()
    );
    display = (
      <Box height="90%">
        {googleData.length === 0 && (
          <Center height="95%" color={color}>
            <Text fontSize="xl" fontWeight="600" textAlign="center">
              You have no events today 🎉
            </Text>
          </Center>
        )}

        {googleData.map((event, index) => {
          const start = new Date(event.start.dateTime);
          const end = new Date(event.end.dateTime);
          let startTime = new Date(start).toLocaleString(
            Intl.DateTimeFormat().resolvedOptions().locale,
            {
              hour: "numeric",
              minute: "2-digit",
              hourCycle: "h12",
            }
          );
          let duration = (
            (end.getTime() - start.getTime()) /
            (1000 * 60)
          ).toString();
          // converting time to hours if longer than 60 minutes
          if (Number.parseInt(duration) > 60) {
            duration = (Number.parseInt(duration) / 60).toFixed(1) + " hour";
          } else if (Number.parseInt(duration) === 60) {
            duration = (Number.parseInt(duration) / 60).toFixed(0) + " hour";
          } else {
            duration += " min";
          }

          const currentTime = new Date();

          if (event.start.date) {
            startTime = "All day";
            duration = "";
          }

          if (
            currentTime < start &&
            currentTime < end &&
            !renderedNextMeetingLine
          ) {
            renderedNextMeetingLine = true;
            const timeUntilEvent = start.getTime() - currentTime.getTime();
            const hours = Math.floor(timeUntilEvent / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilEvent / (1000 * 60)) % 60);

            return (
              <>
                <Box key={index} width="90%" mx="auto" mb="6">
                  <Badge
                    mt="3"
                    p="2"
                    background={`BF${color}`}
                    textTransform="lowercase"
                    borderRadius="16"
                    color={color}
                  >
                    <TimeIcon bgSize="20px" mr="2" mb="1" />
                    <Text
                      display="inline"
                      fontSize={tileWidth <= 300 ? "xs" : "sm"}
                    >
                      {hours === 0 ? "" : `In ${hours} hrs `} {minutes} min
                    </Text>
                  </Badge>
                  <MeetingCard
                    mt="0"
                    startTime={startTime}
                    subject={event.summary}
                    duration={duration}
                    tileWidth={tileWidth}
                    location={undefined}
                    color={color}
                    organizer={event.organizer.email}
                    link={event.htmlLink}
                    pb={index === googleData.length - 1 ? "4" : undefined}
                  />
                </Box>
              </>
            );
          } else {
            return (
              <Box key={index}>
                <MeetingCard
                  startTime={startTime}
                  subject={event.summary}
                  duration={duration}
                  tileWidth={tileWidth}
                  location={undefined}
                  color={color}
                  organizer={event.organizer.email}
                  link={event.htmlLink}
                  pb={index === googleData.length - 1 ? "4" : undefined}
                />
              </Box>
            );
          }
        })}
      </Box>
    );
  } else {
    return <></>;
  }

  return (
    <Box p="2" color={color} position="relative" ref={divRef} height="100%">
      <Box position="absolute" right="4" top="3">
        <GoogleCalendarLogo fill={color} height={18} width={16} />
      </Box>
      {display}
    </Box>
  );
};
