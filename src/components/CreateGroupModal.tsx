import { useState } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const { member } = useMember();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!groupName || !member?._id) {
      alert('Please enter a group name');
      return;
    }

    setIsLoading(true);
    try {
      await BaseCrudService.create('groups', {
        _id: crypto.randomUUID(),
        groupName: groupName,
        description: description,
        creator: member._id,
        creationDate: new Date(),
        isPrivate: isPrivate
      });

      resetForm();
      onOpenChange(false);
      window.location.reload(); // Refresh to show new group
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Error creating group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setGroupName('');
    setDescription('');
    setIsPrivate(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-foreground">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Create New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Group Name */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Group Name</label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="bg-gray-800 border-gray-700 text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter group description (optional)"
              className="bg-gray-800 border-gray-700 text-foreground"
              rows={3}
            />
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <Label className="font-heading text-foreground cursor-pointer">
              Private Group
            </Label>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>
          <p className="text-xs text-secondary">
            {isPrivate ? 'Only you can access this group' : 'Others can view this group'}
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              className="flex-1 bg-gray-800 border-gray-700 text-foreground hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isLoading || !groupName}
              className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground font-heading"
            >
              {isLoading ? 'Creating...' : 'Create Group'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
