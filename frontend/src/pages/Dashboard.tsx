
import { useEffect, useState } from "react";
import { useNoticeStore } from "@/store/noticeStore";
import { useOrganizationStore } from "@/store/organizationStore";
import NoticeCard from "@/components/NoticeCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { notices, fetchNotices, isLoadingNotices, unreadCount } = useNoticeStore();
  const { organizations, fetchOrganizations, isLoading: isLoadingOrgs } = useOrganizationStore();
  const [activeTab, setActiveTab] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchOrganizations();
    fetchNotices();
  }, [fetchOrganizations, fetchNotices]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotices();
    setIsRefreshing(false);
  };

  // Filter notices based on the active tab
  const filteredNotices = notices.filter(notice => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notice.isRead;
    return notice.orgId === activeTab;
  });

  const subscribedOrgs = organizations.filter(org => org.isSubscribed);

  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, idx) => (
        <Card key={idx} className="p-6">
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/3 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            View notices from your subscribed organizations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
            {unreadCount} unread
          </Badge>
        </div>
      </div>

      {subscribedOrgs.length === 0 && !isLoadingOrgs ? (
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No subscribed organizations</h3>
          <p className="text-muted-foreground mb-4">
            Subscribe to organizations to receive their notices
          </p>
          <Button asChild>
            <Link to="/organizations">Browse Organizations</Link>
          </Button>
        </Card>
      ) : (
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4 overflow-x-auto w-full justify-start">
            <TabsTrigger value="all">All Notices</TabsTrigger>
            <TabsTrigger value="unread" className="relative">
              Unread
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            {subscribedOrgs.map(org => (
              <TabsTrigger key={org._id} value={org._id}>
                {org.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeTab} className="mt-0">
            {isLoadingNotices ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {renderSkeletons()}
              </div>
            ) : filteredNotices.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotices.map(notice => (
                  <NoticeCard key={notice._id} notice={notice} />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">No notices found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any notices yet."
                    : activeTab === "unread"
                    ? "You've read all your notices."
                    : "This organization hasn't posted any notices yet."}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
