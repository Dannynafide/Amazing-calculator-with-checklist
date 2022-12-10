import {MdExitToApp} from 'react-icons/md';

import Button from './Button';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
};

function Template(args) {
  return <Button {...args} />;
}

export const Basic = Template.bind({});
Basic.args = {
  // secondary: false,
  children: 'Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  secondary: false,
  icon: <MdExitToApp />,
  children: 'Button',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  secondary: false,
  children: 'Sample long text to try the button',
};

export const LongLabelAndIcon = Template.bind({});
LongLabelAndIcon.args = {
  secondary: false,
  children: 'Sample long text to try the button',
  icon: <MdExitToApp />,
};
