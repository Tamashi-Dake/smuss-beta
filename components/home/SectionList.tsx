import { twMerge } from "tailwind-merge";

interface SectionListProps {
  children: React.ReactNode;
  className?: string;
}
const SectionList: React.FC<SectionListProps> = ({ children, className }) => {
  return (
    <section className={twMerge(`flex flex-col gap-4`, className)}>
      {children}
    </section>
  );
};

export default SectionList;
