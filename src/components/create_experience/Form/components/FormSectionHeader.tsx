interface FormSectionHeaderProps {
  title: string;
  description?: string;
}

export default function FormSectionHeader({
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-midnight-blue">{title}</h2>
      {description && (
        <p className="mt-2 text-base text-charcoal">{description}</p>
      )}
    </div>
  );
}