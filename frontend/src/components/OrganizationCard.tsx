
import { useState } from "react";
import { Organization, useOrganizationStore } from "@/store/organizationStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const { subscribeToOrg, unsubscribeFromOrg } = useOrganizationStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSubscriptionToggle = async () => {
    console.log('Organization', organization)
    setIsUpdating(true);
    try {
      if (organization.isSubscribed) {
        await unsubscribeFromOrg(organization._id);
        toast({
          title: "Unsubscribed",
          description: `You've unsubscribed from ${organization.name}`,
        });
      } else {
        await subscribeToOrg(organization._id);
        toast({
          title: "Subscribed",
          description: `You've subscribed to ${organization.name}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update subscription",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 ${
      organization.isSubscribed ? 'border-primary/30' : ''
    }`}>
      <CardHeader className="pb-3 relative">
        {organization.isSubscribed && (
          <div className="absolute top-3 right-3">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={organization.logoUrl} alt={organization.name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {organization.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{organization.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="text-sm">
          {organization.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant={organization.isSubscribed ? "outline" : "default"}
          className={`w-full ${organization.isSubscribed ? 'hover:bg-destructive/10' : ''}`}
          onClick={handleSubscriptionToggle}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : organization.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
