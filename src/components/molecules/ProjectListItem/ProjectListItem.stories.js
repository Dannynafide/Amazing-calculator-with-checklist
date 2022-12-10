import {BrowserRouter} from 'react-router-dom';
import {CalculatorProvider} from 'context/calculatorContext';
import ProjectListItem from './ProjectListItem';

export default {
  title: 'Components/Molecules/ProjectListItem',
  component: ProjectListItem,
};

function Template(args) {
  return (
    <CalculatorProvider>
      <BrowserRouter>
        <ProjectListItem {...args} />
      </BrowserRouter>
    </CalculatorProvider>
  );
}

export const Basic = Template.bind({});
Basic.args = {
  id: 0,
  name: 'Name',
  totalCost: '1410',
};
