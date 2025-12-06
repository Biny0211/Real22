import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { P2PDevices, Groups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import AddDeviceModal from '@/components/AddDeviceModal';

export default function DevicesPage() {
  const { member } = useMember();
  const [devices, setDevices] = useState<P2PDevices[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [member]);

  const loadData = async () => {
    try {
      if (member?._id) {
        const { items: devicesData } = await BaseCrudService.getAll<P2PDevices>('p2pdevices');
        const userDevices = devicesData.filter(d => d.userId === member._id);
        setDevices(userDevices);

        const { items: groupsData } = await BaseCrudService.getAll<Groups>('groups');
        const userGroups = groupsData.filter(g => g.creator === member._id);
        setGroups(userGroups);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleDeleteDevice = async (deviceId: string) => {
    try {
      await BaseCrudService.delete('p2pdevices', deviceId);
      loadData();
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar groups={groups} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">P2P Devices</h1>
            <p className="text-secondary font-paragraph">Manage your connected peer-to-peer devices</p>
          </div>

          <div className="flex justify-end mb-6">
            <AddDeviceModal open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen} onDeviceAdded={loadData} />
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="border-gray-700">
                  <TableHead className="text-foreground font-heading">Device Name</TableHead>
                  <TableHead className="text-foreground font-heading">Type</TableHead>
                  <TableHead className="text-foreground font-heading">Status</TableHead>
                  <TableHead className="text-foreground font-heading">Added</TableHead>
                  <TableHead className="text-foreground font-heading">Last Seen</TableHead>
                  <TableHead className="text-right text-foreground font-heading">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.length > 0 ? (
                  devices.map(device => (
                    <TableRow key={device._id} className="border-gray-700 hover:bg-gray-800">
                      <TableCell className="text-foreground font-paragraph">{device.deviceName}</TableCell>
                      <TableCell className="text-secondary font-paragraph">{device.deviceType || '-'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          device.deviceStatus === 'online' ? 'bg-green-900 text-green-200' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {device.deviceStatus || 'offline'}
                        </span>
                      </TableCell>
                      <TableCell className="text-secondary font-paragraph text-sm">
                        {device.creationTimestamp ? new Date(device.creationTimestamp).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-secondary font-paragraph text-sm">
                        {device.lastSeen ? new Date(device.lastSeen).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-foreground cursor-pointer">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground cursor-pointer">
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-400 cursor-pointer"
                              onClick={() => handleDeleteDevice(device._id)}
                            >
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-secondary">
                      No devices registered yet. Add your first device to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
