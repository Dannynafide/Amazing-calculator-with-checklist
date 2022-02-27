import Button from '../../components/Button/Button';

export default function Keypad() {
  return (
    <div>
      <Button value={0} />
      <Button value={1} />
      <Button value={2} />
      <Button value={3} />
      <Button value={4} />
      <Button value={5} />
      <Button value={6} />
      <Button value={7} />
      <Button value={8} />
      <Button value={9} />
      <Button value="-" />
      <Button value="+" />
      <Button value="*" />
      <Button value="/" />
      <Button value="%" />
      <Button value="=" />
    </div>
  );
}
