
import { useEffect } from "react";
import { useOrganizationStore } from "@/store/organizationStore";
import OrganizationCard from "@/components/OrganizationCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Organizations = () => {
  const { organizations, fetchOrganizations, isLoading } = useOrganizationStore();

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const subscribedOrgs = organizations.filter(org => org.isSubscribed);
  const unsubscribedOrgs = organizations.filter(org => !org.isSubscribed);

  const renderSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, idx) => (
        <Card key={idx} className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-36" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-full mt-2" />
        </Card>
      ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
        <p className="text-muted-foreground">
          Subscribe to organizations to receive their notices
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Subscribed Organizations</h2>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {renderSkeletons(3)}
          </div>
        ) : subscribedOrgs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subscribedOrgs.map(org => (
              <OrganizationCard key={org._id} organization={org} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              You're not subscribed to any organizations yet
            </p>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Available Organizations</h2>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {renderSkeletons(3)}
          </div>
        ) : unsubscribedOrgs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unsubscribedOrgs.map(org => (
              <OrganizationCard key={org._id} organization={org} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No additional organizations available
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Organizations;
