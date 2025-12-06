import { useState } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceAdded: () => void;
}

export default function AddDeviceModal({ open, onOpenChange, onDeviceAdded }: AddDeviceModalProps) {
  const { member } = useMember();
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('Desktop');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDevice = async () => {
    if (!deviceName || !member?._id) {
      alert('Please enter a device name');
      return;
    }

    setIsLoading(true);
    try {
      await BaseCrudService.create('p2pdevices', {
        _id: crypto.randomUUID(),
        deviceName: deviceName,
        userId: member._id,
        creationTimestamp: new Date(),
        deviceStatus: 'online',
        deviceType: deviceType,
        lastSeen: new Date()
      });

      resetForm();
      onOpenChange(false);
      onDeviceAdded();
    } catch (error) {
      console.error('Error adding device:', error);
      alert('Error adding device. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setDeviceName('');
    setDeviceType('Desktop');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-blue-600 text-primary-foreground font-heading">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-foreground">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Register New Device</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Device Name */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Device Name</label>
            <Input
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="e.g., My Laptop"
              className="bg-gray-800 border-gray-700 text-foreground"
            />
          </div>

          {/* Device Type */}
          <div>
            <label className="text-sm font-heading text-foreground mb-2 block">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded text-foreground p-2"
            >
              <option>Desktop</option>
              <option>Laptop</option>
              <option>Mobile</option>
              <option>Tablet</option>
              <option>Server</option>
            </select>
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
              onClick={handleAddDevice}
              disabled={isLoading || !deviceName}
              className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground font-heading"
            >
              {isLoading ? 'Adding...' : 'Add Device'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
