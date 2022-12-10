import ProgressBar from './ProgressBar';

export default {
  title: 'Components/Atoms/ProgressBar',
  component: ProgressBar,
};

function Template(args) {
  return <ProgressBar {...args} />;
}

export const Basic = Template.bind({});
Basic.args = {
  progress: 20,
};
