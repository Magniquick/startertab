import { LargeStockTickerSkeleton } from "@/components/skeletons/LargeStockTickerSkeleton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import { isEditingTileGridAtom } from "@/recoil/SidebarAtoms";
import { stockSelector } from "@/recoil/UserSettingsSelectors";
import { FinnhubQuoteResponse, StockTickers } from "@/types/stocks";
import {
  Box,
  Center,
  Flex,
  Grid,
  Input,
  InputGroup,
  StatDownArrow,
  StatUpArrow,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";

interface LargeStockTileProps {
  tileId: number;
}

interface StockDisplayProps {
  stockTicker?: FinnhubQuoteResponse;
}

interface InputDisplayProps {
  setStockInputs: React.Dispatch<React.SetStateAction<string[]>>;
  color: string;
  stockInputs: string[];
  index: number;
}

const fetcher = async (stockNames: string) => {
  try {
    const res = await fetch(`/api/stocks/quote?stocks=${stockNames}`);
    if (res.status >= 400) {
      throw new Error("Failed request");
    }

    const data = (await res.json()) as StockTickers;
    return data;
  } catch (err) {
    throw new Error(err as string);
  }
};

const StockDisplay: React.FC<StockDisplayProps> = ({ stockTicker }) => {
  let textDisplay;

  // bung stock name, it's an error on the users behalf
  if (stockTicker?.c === 0) {
    textDisplay = (
      <Box>
        <Text color="red.500" fontSize="xs">
          Sorry, I couldn&apos;t find that stock 😔
        </Text>
      </Box>
    );
  } else {
    textDisplay = (
      <Box>
        <Text
          color={stockTicker?.dp! > 0 ? "green" : "red.500"}
          fontSize={"sm"}
        >
          {stockTicker?.dp! > 0 ? (
            <StatUpArrow mb="1" mr="1" />
          ) : (
            <StatDownArrow />
          )}
          ${stockTicker?.d} ({stockTicker?.dp.toFixed(2)}%)
        </Text>
      </Box>
    );
  }

  return (
    <Flex
      flexDir="column"
      key={stockTicker?.ticker}
      borderRadius="10px"
      mb="4"
      mr="2"
    >
      <Text fontWeight="700" size="lg">
        {stockTicker?.ticker.toUpperCase()}
      </Text>
      <Text fontSize="lg" opacity="0.9">{`$${stockTicker?.c}`}</Text>
      {textDisplay}
    </Flex>
  );
};

const InputDisplay: React.FC<InputDisplayProps> = ({
  setStockInputs,
  color,
  stockInputs,
  index,
}) => {
  const changeStockInputs = (newInputValue: string) => {
    const inputsToChange = [...stockInputs];
    inputsToChange[index] = newInputValue;

    setStockInputs(inputsToChange);
  };

  return (
    <InputGroup mt="4">
      <Input
        name="Stock Name"
        placeholder="Stock symbol"
        value={stockInputs[index]}
        borderColor={color}
        _placeholder={{ color: color }}
        onChange={(e) => changeStockInputs(e.target.value)}
      />
    </InputGroup>
  );
};

export const LargeStockTile: React.FC<LargeStockTileProps> = ({ tileId }) => {
  const color = `var(--text-color-${tileId})`;
  const isEditing = useRecoilValue(isEditingTileGridAtom);
  const [stocks, setStocks] = useRecoilState(stockSelector(tileId)) as [
    string | undefined,
    SetterOrUpdater<string | undefined>
  ];
  const [stockInputs, setStockInputs] = useState<string[]>([]);

  const { data, error, isLoading } = useQuery(
    ["largeStockTile", stocks],
    () => fetcher(stocks!),
    {
      enabled: stocks != undefined && stocks !== "",
      retry: 2,
    }
  );

  const handleSubmitStockName = (e: React.FormEvent) => {
    e.preventDefault();
    const stocks = stockInputs.join(",");
    setStocks(stocks);
  };

  let toDisplay;

  if (!stocks) {
    toDisplay = (
      <form onSubmit={handleSubmitStockName}>
        <Flex justifyContent={"center"} alignItems="center">
          <Box>
            <InputDisplay
              color={color}
              setStockInputs={setStockInputs}
              stockInputs={stockInputs}
              index={0}
            />
            <InputDisplay
              color={color}
              setStockInputs={setStockInputs}
              stockInputs={stockInputs}
              index={1}
            />
            <InputDisplay
              color={color}
              setStockInputs={setStockInputs}
              stockInputs={stockInputs}
              index={2}
            />
            <InputDisplay
              color={color}
              setStockInputs={setStockInputs}
              stockInputs={stockInputs}
              index={3}
            />
          </Box>
          <Box>
            <OutlinedButton type="submit" ml="4" borderColor={color}>
              Load stocks
            </OutlinedButton>
          </Box>
        </Flex>
      </form>
    );
  } else if (isLoading) {
    toDisplay = <LargeStockTickerSkeleton />;
  } else if (data) {
    toDisplay = (
      <Grid templateColumns={"150px 150px"} rowGap="30px" columnGap={"100px"}>
        {data.map((stockTicker) => (
          <StockDisplay key={stockTicker?.ticker} stockTicker={stockTicker} />
        ))}
      </Grid>
    );
  } else if (error) {
    toDisplay = (
      <Text size="xs">Sorry, I couldn&apos;t find that stock 😔</Text>
    );
  }

  return (
    <Center height="100%" width="100%" color={color} p="8">
      {toDisplay}
      {isEditing && (
        <OutlinedButton
          size="xs"
          pos="absolute"
          right="2"
          bottom="2"
          color={color}
          shadow="none"
          opacity={0.6}
          onClick={() => setStocks(undefined)}
        >
          Change stocks
        </OutlinedButton>
      )}
    </Center>
  );
};
