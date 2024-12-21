import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1>React Kitchen Sink</h1>
        <p className="text-lg text-muted-foreground mt-2">
          A collection of pre-built components and examples to help you build your React application.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Text styles and headings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/typography'}>
              View Examples
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Display</CardTitle>
            <CardDescription>Tables, lists and more</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/data-display'}>
              View Examples
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>Alerts, toasts and loading states</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" onClick={() => window.location.href = '/feedback'}>
              View Examples
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;