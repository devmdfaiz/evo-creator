import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import LineGraph from "../global/graphs/LineGraph";

type Props = {
  title: string;
  goal: string | number;
  desc: string;
  data?: any[] | undefined;
  key?: string | undefined;
};

const SmallCard = ({ title, goal, desc, data, key }: Props) => {
  return (
    <Card className={cn("grow rounded-sm")}>
      <CardHeader>
        <CardDescription className={cn("text-foreground")}>
          {title}
        </CardDescription>
        <CardTitle className={cn("text-2xl font-bold")}>{goal}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      {data && <CardContent>{<LineGraph data={data} key={key} />}</CardContent>}
    </Card>
  );
};

export default SmallCard;
