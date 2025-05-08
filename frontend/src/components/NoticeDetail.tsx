
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Notice, useNoticeStore } from "@/store/noticeStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheck, Download, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NoticeDetailProps {
  noticeId?: string;
  onClose?: () => void;
}

const NoticeDetail = ({ noticeId, onClose }: NoticeDetailProps) => {
  const { id } = useParams();
  const effectiveId = noticeId || id;
  const { getNotice, currentNotice, markAsRead, isLoadingCurrentNotice } = useNoticeStore();
  const { toast } = useToast();

  useEffect(() => {
    if (effectiveId) {
      console.log('EffectiveId', effectiveId)
      getNotice(effectiveId);
    }
  }, [effectiveId, getNotice]);

  const handleMarkAsRead = async () => {
    if (currentNotice && !currentNotice.isRead) {
      try {
        await markAsRead(currentNotice._id);
        toast({
          title: "Notice marked as read",
          description: "This notice has been marked as read",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  const getPriorityColor = (priority: string = 'medium') => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'low':
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoadingCurrentNotice) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    );
  }

  if (!currentNotice) {
    return (
      <Card className="w-full max-w-3xl mx-auto text-center py-8">
        <CardContent>
          <p className="text-muted-foreground">Notice not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{currentNotice.title}</CardTitle>
            <CardDescription className="mt-2">
              <span className="font-medium text-foreground">
                {currentNotice.orgName}
              </span>{" "}
              • {formatDate(currentNotice.createdAt)}
            </CardDescription>
          </div>
          {currentNotice.priority && (
            <Badge className={getPriorityColor(currentNotice.priority)}>
              {currentNotice.priority.toUpperCase()}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4 space-y-6">
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-line">{currentNotice.content}</p>
        </div>
        
        {currentNotice.attachments && currentNotice.attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Attachments</h4>
            <div className="flex flex-col gap-2">
              {currentNotice.attachments.map((attachment) => (
                <Button 
                  key={attachment.url} 
                  variant="outline" 
                  className="justify-start gap-2 w-full text-left"
                  asChild
                >
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                    {attachment.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {currentNotice.tags && currentNotice.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {currentNotice.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-secondary/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        {!currentNotice.isRead ? (
          <Button 
            onClick={handleMarkAsRead}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark as Read
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">Already read</p>
        )}
        
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NoticeDetail;
