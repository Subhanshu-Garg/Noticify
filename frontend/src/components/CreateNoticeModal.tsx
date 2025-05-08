import { useState, useEffect } from "react";
import { useOrganizationStore } from "@/store/organizationStore";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import nodeHttp from "@/lib/nodeHttp";
import { Badge } from "@/components/ui/badge";
import { Notice, useNoticeStore } from "@/store/noticeStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface CreateNoticeModalProps {
  onSuccess?: () => void;
}

export function CreateNoticeModal({ onSuccess }: CreateNoticeModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialFormData: Partial<Notice> = {
    orgId: "",
    title: "",
    content: "",
    priority: "medium",
    tags: [] as string[],
    attachments: [],
    createdBy: {
      _id: "",
      name: ""
    }
  }
  const [formData, setFormData] = useState<Partial<Notice>>(initialFormData);
  const [newTag, setNewTag] = useState("")
  const { createNotice } = useNoticeStore()
  const { adminOrganizations, fetchAdminOrganizations, isLoading } = useOrganizationStore();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchAdminOrganizations();
    }
  }, [open, fetchAdminOrganizations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orgId || !formData.title.trim() || !formData.content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (formData.title.length > 30) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title must be 30 characters or less",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createNotice(formData)
      
      toast({
        title: "Success",
        description: "Notice created successfully",
      });
      
      setOpen(false);
      setFormData(initialFormData);
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create notice",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("")
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-9 min-h-[36px] px-2 py-1 text-xs md:w-auto md:h-10 md:px-3 md:py-1.5 md:text-sm">
          <Plus className="h-3 w-3 mr-1 md:h-3.5 md:w-3.5 md:mr-1.5" />
          <span className="whitespace-nowrap">Create Notice</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[720px]">
        <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create Notice</CardTitle>
            <CardDescription>
              Create a new notice for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="organization">Organization</Label>
              <Select
                value={formData.orgId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, orgId: value }))}
                disabled={isLoading}
              >
                <SelectTrigger id="organization">
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading organizations...
                    </SelectItem>
                  ) : adminOrganizations.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No organizations available
                    </SelectItem>
                  ) : (
                    adminOrganizations.map((org) => (
                      <SelectItem key={org._id} value={org._id}>
                        {org.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter notice title"
                maxLength={30}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter notice content"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: "high" | "medium" | "low") => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
        </Card>
        
      </DialogContent>
    </Dialog>
  );
} 