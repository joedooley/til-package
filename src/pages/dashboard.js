import PageTitle from '@components/core/page/title.js';
import EmptyState from '@components/dashboard/empty-state.js';
import { Flex, Text, Button, Heading } from '@components/core/html';

export default function Dashboard(props) {
  return (
    <Flex direction="column" vAlign="flex-start">
      <PageTitle {...props} value="Dashboard" />
      <EmptyState />
    </Flex>
  );
}
