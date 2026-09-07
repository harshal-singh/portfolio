import { Reveal } from "@/components/motion/Reveal";

import { cn, formatSectionKick } from "@/lib/utils";



interface AuroraSectionHeaderProps {

  label: string;

  title: string;

  description?: string;

  className?: string;

  align?: "center" | "left";

}



export function AuroraSectionHeader({

  label,

  title,

  description,

  className,

  align = "center",

}: AuroraSectionHeaderProps) {

  return (

    <Reveal>

      <div

        className={cn(

          "aurora-section-head",

          align === "left" && "text-left",

          className,

        )}

      >

        <p className="aurora-kick">{formatSectionKick(label)}</p>

        <h2 className="jk">{title}</h2>

        {description ? <p>{description}</p> : null}

      </div>

    </Reveal>

  );

}

