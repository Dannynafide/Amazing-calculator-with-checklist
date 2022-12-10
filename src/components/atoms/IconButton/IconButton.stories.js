import {MdCheck, MdClose} from 'react-icons/md';
import colors from 'theme/colors.scss';

import IconButton from './IconButton';

export default {
  title: 'Components/Atoms/IconButton',
  component: IconButton,
};

function Template(args) {
  return <IconButton {...args} />;
}

export const Accept = Template.bind({});
Accept.args = {
  children: <MdCheck />,
};

export const Close = Template.bind({});
Close.args = {
  color: colors.error,
  children: <MdClose />,
};
