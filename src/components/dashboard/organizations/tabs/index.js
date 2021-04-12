import '@reach/tabs/styles.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';
import { css } from '@emotion/react';
import { Flex } from '@components/core/html';

const StyledTabs = styled(Flex)(
  ({ theme }) => css`
    color: ${theme.colors.text};
    flex-direction: column;
    width: 100%;

    [data-reach-tab-list] {
      border-bottom: ${theme.borders.secondary};
      border-bottom-width: 2px;
      margin-bottom: 30px;
    }

    [data-reach-tab] {
      color: ${theme.colors.text};
      font-size: ${theme.fontSizes[0]};
      margin-bottom: -2px;
      margin-right: 24px;
      padding-bottom: ${theme.space[2]};

      &:focus {
        outline: none;
      }
    }

    [data-reach-tab][data-selected] {
      border-bottom-color: ${theme.colors.brand.primary};
      border-bottom-width: 2px;
      color: ${theme.colors.white};
    }
  `
);

export default function OrganizationTabs({ tab1, tab2, ...rest }) {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <StyledTabs className={rest.className}>
      <Tabs onChange={index => setTabIndex(index)}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Team</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{tab1}</TabPanel>
          <TabPanel>{tab2}</TabPanel>
        </TabPanels>
      </Tabs>
    </StyledTabs>
  );
}

OrganizationTabs.propTypes = {
  tab1: PropTypes.node,
  tab2: PropTypes.node,
};
