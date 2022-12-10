import Display from './Display';

export default {
  title: 'Components/Atoms/Display',
  component: Display,
};

function Template(args) {
  return <Display {...args} />;
}

export const Basic = Template.bind({});
Basic.args = {
  value: 1420,
};
