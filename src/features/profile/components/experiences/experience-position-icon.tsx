import type { LucideProps } from "lucide-react";
import {
  BrainIcon,
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  CpuIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  education: GraduationCapIcon,
  business: BriefcaseBusinessIcon,
  idea: LightbulbIcon,
  brain: BrainIcon,
  cpu: CpuIcon,
  chart: TrendingUpIcon,
};

export function ExperienceIcon({
  icon,
  ...props
}: {
  icon?: string;
} & LucideProps) {
  const IconComponent = (icon && iconMap[icon]) || BriefcaseBusinessIcon;
  return <IconComponent {...props} />;
}
