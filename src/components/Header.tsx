"use client";

import { Flex, Title, Text, Grid } from "@tremor/react";

export default function Header() {
  return (
    <>
     <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 pt-3">
      <div>
        <span className="sr-only">YAZIO</span>
        <img src="https://assets.yazio.com/frontend/images/yazio-logo.svg" 
          className="navbar-brand" alt="YAZIO Logo"
        />
      </div>
      <div className="flex h-[42px] flex-nowrap gap-1">
        <button className="relative inline-flex items-center justify-center whitespace-nowrap border text-center text-sm font-medium transition-all duration-100 ease-in-out disabled:pointer-events-none disabled:shadow-none shadow-none border-transparent text-gray-900 dark:text-gray-50 bg-transparent disabled:text-gray-400 disabled:dark:text-gray-600 outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 group rounded-full p-1 hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 data-[state=open]:dark:bg-gray-400/10" tremor-id="tremor-raw" aria-label="open notifications" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed">
          <span className="flex size-8 items-center justify-center rounded-full border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-900 hover:dark:bg-gray-400/10">
          <span className="absolute right-2.5 top-2.5 size-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true"></span>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon -ml-px size-4 shrink-0 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"><path d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
          </span>
        </button>
        <button aria-label="open settings" className="outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 group rounded-full p-1 hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 data-[state=open]:dark:bg-gray-400/10" type="button" id="radix-:r9:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300" aria-hidden="true">ES</span>
        </button>
      </div>
     </div>
     <nav aria-label="Main" data-orientation="horizontal" dir="ltr" tremor-id="tremor-raw">
      <div className="relative">
        <ul data-orientation="horizontal" className="flex items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden border-gray-200 dark:border-gray-800 mt-5" dir="ltr">
          <div className="mx-auto flex w-full max-w-7xl items-center px-6">
            <li className="flex">
              <a data-active="" aria-current="page" className="group relative flex shrink-0 select-none items-center justify-center" data-radix-collection-item="" href="/support">
                <span className="items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all text-gray-500 dark:text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400 group-hover:border-gray-300 group-hover:dark:border-gray-400 group-data-[active]:border-blue-500 group-data-[active]:text-blue-500 group-data-[active]:dark:border-blue-500 group-data-[active]:dark:text-blue-500 outline outline-offset-2 outline-0 focus-visible:outline-2 outline-blue-500 dark:outline-blue-500 inline-flex gap-2">Support</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </nav>
    
    <Grid numItems={1} numItemsLg={2} className="gap-4">
      <Flex justifyContent="start" className="space-x-4">
        <picture>
          <img src="https://assets.yazio.com/frontend/images/yazio-logo.svg" 
            className="navbar-brand" alt="YAZIO Logo"
          />
        </picture>
        <div>
          <Title>NutriTrack</Title>
          <Text>Food reports & players management</Text>
        </div>
      </Flex>
      <div>
        <Flex alignItems="center" justifyContent="end">
          <picture>
            {/* <img src={''} alt={''} width={40} height={40} className="w-10 rounded-lg shadow-lg mr-3" /> */}
          </picture>
          <div className="mr-6">
            <h5 className="block font-sans text-md font-semibold tracking-normal text-blue-gray-900">{'dsfsdf'}</h5>
            <Text className="text-xs">{'dsfsdf'}</Text>
          </div>
        </Flex>
      </div>
    </Grid>
    </>
  );
};