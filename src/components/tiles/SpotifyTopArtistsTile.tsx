import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { OptionBadge } from "@/components/ui/OptionBadge";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { SpotifyLogo } from "@/components/icons/SpotifyLogo";
import { SpotifyContext } from "@/context/SpotifyContext";
import { spotifyTopArtistTimeLengthSelector } from "@/recoil/UserSettingsSelectors";
import { SpotifyContextInterface } from "@/types";
import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

type SmallSpotifyTileProps = {
  tileId: number;
};

export const SpotifyTopArtistsTile: React.FC<SmallSpotifyTileProps> = ({
  tileId,
}) => {
  const [timeLength, setTimeLength] = useRecoilState(
    spotifyTopArtistTimeLengthSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const { topArtists, isAuthenticated, loginWithSpotify, fetchTopArtistData } =
    useContext(SpotifyContext) as SpotifyContextInterface;

  React.useEffect(() => {
    if (!timeLength) {
      return;
    }

    fetchTopArtistData(timeLength);
  }, [fetchTopArtistData, timeLength]);

  const changeSpotifyTimeLength = (timeLength: string) => {
    setTimeLength(timeLength);
  };

  const color = `var(--text-color-${tileId})`;

  if (isAuthenticated === false) {
    return (
      <Center height="100%">
        <OutlinedButton
          onClick={loginWithSpotify}
          color={color}
          borderColor={color}
        >
          Continue with Spotify&nbsp;
          <SpotifyLogo fill={color} height={20} width={20} />
        </OutlinedButton>
      </Center>
    );
  }

  return (
    <Box color={color} height="100%" p="2" position="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="14px"
        right="2"
        top="2"
        opacity="0.7"
      >
        <SpotifyLogo fill={color} height={18} width={18} />
      </Link>
      <Heading p="2" fontSize="xl" fontWeight="bold">
        Top Spotify Artists
      </Heading>
      <Box w="80%" bg="white" height="1px" ml="2" bgColor={color} />

      <Flex dir="row" flexDir="column">
        <UnorderedList mt="2" ml="2" style={{ listStyle: "none" }}>
          {topArtists.length > 0 ? (
            topArtists.map((artist, index) => {
              return (
                <ListItem key={artist.name}>{`${index + 1}. ${
                  artist.name
                }`}</ListItem>
              );
            })
          ) : (
            <TextFeedSkeleton />
          )}
        </UnorderedList>
        {topArtists.length > 0 && (
          <Box width="100%" mt="2" mb="4" textAlign="center">
            <OptionBadge
              onClick={() => changeSpotifyTimeLength("short_term")}
              color={color}
            >
              Short term
            </OptionBadge>
            <Box mt="2">
              <OptionBadge
                onClick={() => changeSpotifyTimeLength("medium_term")}
                color={color}
                mr="1"
              >
                Medium Term
              </OptionBadge>
              <OptionBadge
                ml="1"
                onClick={() => changeSpotifyTimeLength("long_term")}
                color={color}
              >
                Long Term
              </OptionBadge>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
