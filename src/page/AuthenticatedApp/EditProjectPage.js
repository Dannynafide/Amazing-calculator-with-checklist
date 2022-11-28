import {useParams, useNavigate} from 'react-router-dom';

import {useCalculatorState} from 'context/calculatorContext';
import ChangeNameTemplate from 'templates/ChangeNameTemplate/ChangeNameTemplate';

export default function EditProjetPage() {
  const {calculationId} = useParams();
  const {getProject, updateProject, getResult} = useCalculatorState();
  const project = getProject(calculationId);
  const navigate = useNavigate();

  const handleSaveName = (name) => {
    updateProject(project.id, name, null);
    navigate(`/calculation/${project.id}`, {replace: false});
  };

  if (!project) {
    return (
      <section>
        <p>Page not found!</p>
      </section>
    );
  }

  return (
    <ChangeNameTemplate
      id={project.id.toString()}
      name={project.name}
      value={getResult(project.id).toString() || null}
      submit={handleSaveName}
    />
  );
}
