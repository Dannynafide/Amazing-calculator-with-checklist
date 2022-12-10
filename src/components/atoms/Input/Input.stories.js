import Input from './Input';

export default {
  title: 'Components/Atoms/Input',
  component: Input,
};

function Template(args) {
  return <Input {...args} />;
}

export const BasicInput = Template.bind({});
BasicInput.args = {
  placeholder: 'Placeholder',
  value: 'Input',
};
