import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TreatmentProgress() {
  const treatments = [
    {
      id: 1,
      name: "Orthodontic Treatment",
      progress: 75,
      startDate: "Jan 2024",
      endDate: "Dec 2024",
    },
    {
      id: 2,
      name: "Teeth Whitening",
      progress: 30,
      startDate: "Mar 2024",
      endDate: "May 2024",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Progress</CardTitle>
        <CardDescription>Track your ongoing treatments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{treatment.name}</p>
                <span className="text-sm text-muted-foreground">
                  {treatment.progress}%
                </span>
              </div>
              <Progress value={treatment.progress} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{treatment.startDate}</span>
                <span>{treatment.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

