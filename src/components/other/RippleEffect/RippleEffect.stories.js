import Button from 'components/atoms/Button/Button';
import RippleEffect from './RippleEffect';

export default {
  title: 'Components/Other/RippleEffectSimulation',
  component: RippleEffect,
};
const wrapperStyles = {
  backgroundColor: 'darkgray',
  width: '200px',
  height: '200px',
};

const styles = {
  // Riple effect
  position: 'relative',
  overflow: 'hidden',
  maskImage:
    'mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)',

  // style for the item
  width: '100px',
  height: '100px',
  border: 'none',
  backgroundColor: 'silver',
  marginLeft: '50px',
  marginTop: '30px',
};

function Template(args) {
  return (
    <div style={wrapperStyles}>
      Area not allowed
      <button type="button" style={styles}>
        Riple effect - allowed area
        <RippleEffect {...args} />
      </button>
    </div>
  );
}

export const BasicEffect = Template.bind({});
BasicEffect.args = {
  duration: 850,
};

export const Color = Template.bind({});
Color.args = {
  duration: 850,
  color: 'red',
};

function TemplateComponent() {
  return (
    <div style={{backgroundColor: 'darkgrey'}}>
      Area not allowed
      <Button>Button</Button>
      Area not allowed
    </div>
  );
}

export const ButtonComponent = TemplateComponent.bind({});
