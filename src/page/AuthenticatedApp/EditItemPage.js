import {useParams, useNavigate} from 'react-router-dom';

import {useCalculatorState} from 'context/calculatorContext';
import ChangeNameTemplate from 'templates/ChangeNameTemplate/ChangeNameTemplate';

export default function EditProjetPage() {
  const {calculationId, itemId} = useParams();
  const navigate = useNavigate();
  const {getProject, updateProject} = useCalculatorState();
  const project = getProject(calculationId);

  const itemIndex = project.data.findIndex(
    (item) => item.id.toString() === itemId.toString()
  );

  const handleSaveName = (name) => {
    const newData = [...project.data];
    newData[itemIndex].name = name;
    updateProject(calculationId, null, newData);
    navigate(`/calculation/${calculationId}`, {replace: false});
  };

  if (itemIndex === -1) {
    return (
      <section>
        <p>Page not found!</p>
      </section>
    );
  }

  return (
    <ChangeNameTemplate
      id={project.data[itemIndex].id.toString()}
      name={project.data[itemIndex].name}
      value={project.data[itemIndex].value.toString() || null}
      submit={handleSaveName}
    />
  );
}
