import { useEffect, useState } from "react";
import { useOrganizationStore } from "@/store/organizationStore";
import { useNoticeStore } from "@/store/noticeStore";
import { CreateNoticeModal } from "@/components/CreateNoticeModal";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCheck, RefreshCcw, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import NoticeCard from "@/components/NoticeCard";

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { adminOrganizations, fetchAdminOrganizations, isLoading: isLoadingOrgs } = useOrganizationStore();
  const { notices, isLoadingCreatingNotice: isLoadingNotices, fetchNotices, markAsRead } = useNoticeStore();

  useEffect(() => {
    fetchAdminOrganizations();
    fetchNotices();
  }, [fetchAdminOrganizations, fetchNotices]);

  const isAdmin = adminOrganizations.length > 0;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchNotices();
      toast({
        title: "Success",
        description: "Notices refreshed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh notices",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotices = notices.filter(notice => !notice.isRead);
      const promises = []
      for (const notice of unreadNotices) {
        promises.push(markAsRead(notice._id))
      }
      await Promise.allSettled(promises)
      toast({
        title: "Success",
        description: "All notices marked as read",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark notices as read",
      });
    }
  };

  const clearSearch = () => setSearchTerm("");

  const filteredNotices = notices
    .filter(notice =>
      notice?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      notice?.content?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      notice?.orgName?.toLowerCase()?.includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "unread":
          return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
        default:
          return 0;
      }
    });

  const unreadCount = notices.filter(notice => !notice.isRead).length;

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
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
          <p className="text-muted-foreground">
            View and manage notices from your organizations
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </Button>
          </div>
          {isAdmin && (
            <CreateNoticeModal onSuccess={fetchNotices} />
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Sort By
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="unread">Unread First</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoadingNotices || isLoadingOrgs ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderSkeletons(3)}
        </div>
      ) : filteredNotices.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map(notice => (
            <NoticeCard key={notice._id} notice={notice} />
            // <Card key={notice._id} className="p-6">
            //   <div className="flex items-center gap-3 mb-4">
            //     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            //       <span className="text-lg font-semibold text-primary">
            //         {notice.organization.name[0].toUpperCase()}
            //       </span>
            //     </div>
            //     <div>
            //       <h3 className="font-semibold">{notice.organization.name}</h3>
            //       <p className="text-sm text-muted-foreground">
            //         {new Date(notice.createdAt).toLocaleDateString()}
            //       </p>
            //     </div>
            //   </div>
            //   <h4 className="font-semibold mb-2">{notice.title}</h4>
            //   <p className="text-muted-foreground mb-4 line-clamp-3">{notice.content}</p>
            //   {notice.expiry && (
            //     <p className="text-sm text-muted-foreground">
            //       Expires: {new Date(notice.expiry).toLocaleDateString()}
            //     </p>
            //   )}
            // </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No notices found</h3>
          <p className="text-muted-foreground">
            {searchTerm
              ? "No notices match your search criteria"
              : "You don't have any notices yet"}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Notices;
