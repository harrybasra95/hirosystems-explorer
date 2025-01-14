import { FilterButton } from '@/components/filter-button';
import { Tab } from '@/ui/Tab';
import { TabList } from '@/ui/TabList';
import { TabPanel } from '@/ui/TabPanel';
import { TabPanels } from '@/ui/TabPanels';
import { Tabs } from '@/ui/Tabs';
import * as React from 'react';
import { FC, ReactNode } from 'react';

export const TxListTabs: FC<{
  confirmedList: ReactNode;
  mempoolList: ReactNode;
}> = ({ confirmedList, mempoolList }) => {
  return (
    <Tabs variant={'soft-rounded'} isLazy gridColumnStart={'1'} gridColumnEnd={'2'} minWidth={0}>
      <TabList>
        <Tab>Confirmed</Tab>
        <Tab>Pending</Tab>
        <FilterButton />
      </TabList>
      <TabPanels>
        <TabPanel>{confirmedList}</TabPanel>
        <TabPanel>{mempoolList}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
