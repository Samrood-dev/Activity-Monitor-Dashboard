import Sparkline from "./Sparkline";

interface MetricCardProps {
  label: string;
  value: number;
  subtitle: string;
  sparkData: number[];
  color: string;
}

export default function MetricCard({
  label,
  value,
  subtitle,
  sparkData,
  color,
}: MetricCardProps) {
  return (
    <div className="bg-[hsl(224,10%,11%)] border border-white/[0.07] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[11.5px] text-white/40 font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-[28px] font-semibold text-white/90 leading-tight mt-0.5">
            {value}
          </p>
        </div>
        <div className="w-24 mt-1">
          <Sparkline data={sparkData} color={color} />
        </div>
      </div>
      <p className="text-[11.5px] text-white/30">{subtitle}</p>
    </div>
  );
}
