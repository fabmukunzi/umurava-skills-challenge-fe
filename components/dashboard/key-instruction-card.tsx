
interface KeyInstructionProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

const KeyInstruction = ({ icon, title, value }: KeyInstructionProps) => (
  <div className="flex items-center space-x-4">
    <div className="bg-primary/20 text-primary p-2.5 rounded-full">{icon}</div>
    <div>
      <h3 className="font-medium">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

export default KeyInstruction;
