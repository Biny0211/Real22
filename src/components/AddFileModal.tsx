import { useState } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Groups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Plus } from 'lucide-react';

interface AddFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileAdded: () => void;
  groups: Groups[];
}

export default function AddFileModal({ open, onOpenChange, onFileAdded, groups }: AddFileModalProps) {
  const { member } = useMember();
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSplit = async () => {
    if (!fileName || !file || !member?._id) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate file upload to Wix Media Manager
      const fileUrl = `https://static.wixstatic.com/media/12d367_${Math.random().toString(36).substr(2, 9)}~mv2.${file.name.split('.').pop()}`;

      // Create file record in CMS
      await BaseCrudService.create('files', {
        _id: crypto.randomUUID(),
        fileName: fileName,
        fileUrl: fileUrl,
        groupId: selectedGroup || undefined,
        keywords: keywords,
        createdBy: member._id,
        createdAt: new Date(),
        status: 'active'
      });

      // Simulate Split API call
      console.log('Simulating Split API call for file:', fileName);
      await new Promise(resolve => setTimeout(resolve, 500));

      onFileAdded();
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFileName('');
    setDescription('');
    setKeywords('');
    setSelectedGroup('');
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-blue-600 text-primary-foreground font-heading">
          <Plus className="w-4 h-4 mr-2" />
          Add File
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-foreground">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Upload New File</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-neon-teal transition">
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer block">
              <Upload className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <p className="text-sm font-paragraph text-foreground">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-secondary">Any file type supported</p>
            </label>
          </div>

          {/* File Name */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">File Name</label>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="bg-gray-800 border-gray-700 text-foreground"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter file description (optional)"
              className="bg-gray-800 border-gray-700 text-foreground"
              rows={3}
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Keywords</label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords (comma-separated)"
              className="bg-gray-800 border-gray-700 text-foreground"
            />
          </div>

          {/* Group Selection */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Group (Optional)</label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-foreground">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">No Group</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group._id} value={group._id || ''}>
                    {group.groupName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              onClick={handleSplit}
              disabled={isLoading || !file}
              className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground font-heading"
            >
              {isLoading ? 'Uploading...' : 'Split & Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
