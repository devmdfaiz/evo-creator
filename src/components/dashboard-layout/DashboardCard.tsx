import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";

type Props = {
  title: string;
  goal: string | number;
  desc: string;
};

const DashboardCard = ({ title, goal, desc }: Props) => {
  const splitDesc = desc.split("%");

  const indicator = splitDesc[0].includes("-") ? 0 : 1;

  return (
    <Card className={cn("grow")}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium")}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{goal}</div>
        <div className="pt-1">
          {splitDesc[0] && (
            <>
              <span
                className={`${
                  indicator === 0
                    ? "bg-red-700/20 text-red-700"
                    : "bg-green-700/20 text-green-700"
                } px-2 py-1 rounded-md text-xs`}
              >{`${splitDesc[0]}%`}</span>{" "}
              <span className="text-xs text-muted-foreground">
                {splitDesc[1]}
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
