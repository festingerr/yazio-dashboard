"use client";

import { Flex, Title, Text, Grid } from "@tremor/react";

export default function Header() {
  return (
    <Grid numItems={1} numItemsLg={2} className="gap-4">
      <Flex justifyContent="start" className="space-x-4">
        <picture>
          <img src="/logo.png" alt="" className="h-12" />
        </picture>
        <div>
          <Title>NutriTrack</Title>
          <Text>Food reports & players management</Text>
        </div>
      </Flex>
      <div>
        <Flex alignItems="center" justifyContent="end">
          <picture>
            <img src={''} alt={''} width={40} height={40} className="w-10 rounded-lg shadow-lg mr-3" />
          </picture>
          <div className="mr-6">
            <h5 className="block font-sans text-md font-semibold tracking-normal text-blue-gray-900">{'dsfsdf'}</h5>
            <Text className="text-xs">{'dsfsdf'}</Text>
          </div>
        </Flex>
      </div>
    </Grid>
  );
};