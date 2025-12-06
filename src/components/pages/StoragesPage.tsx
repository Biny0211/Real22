import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Storages, P2PDevices } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreVertical, HardDrive } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Groups } from '@/entities';
import AddDeviceModal from '@/components/AddDeviceModal';

export default function StoragesPage() {
  const { member } = useMember();
  const [storages, setStorages] = useState<Storages[]>([]);
  const [devices, setDevices] = useState<P2PDevices[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [isAddStorageOpen, setIsAddStorageOpen] = useState(false);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newStorageName, setNewStorageName] = useState('');
  const [newStorageType, setNewStorageType] = useState('Google Drive');

  useEffect(() => {
    loadData();
  }, [member]);

  const loadData = async () => {
    try {
      if (member?._id) {
        const { items: storagesData } = await BaseCrudService.getAll<Storages>('storages');
        const userStorages = storagesData.filter(s => s.userId === member._id);
        setStorages(userStorages);

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

  const handleAddStorage = async () => {
    if (!newStorageName || !member?._id) {
      alert('Please enter a storage name');
      return;
    }

    try {
      // Simulate OAuth connection
      console.log(`Simulating ${newStorageType} OAuth connection...`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      await BaseCrudService.create('storages', {
        _id: crypto.randomUUID(),
        storageName: newStorageName,
        storageType: newStorageType,
        userId: member._id,
        totalCapacity: 1099511627776, // 1TB in bytes
        usedCapacity: Math.floor(Math.random() * 549755813888), // Random usage
        createdAt: new Date()
      });

      setNewStorageName('');
      setNewStorageType('Google Drive');
      setIsAddStorageOpen(false);
      loadData();
    } catch (error) {
      console.error('Error adding storage:', error);
      alert('Error adding storage. Please try again.');
    }
  };

  const handleDeleteStorage = async (storageId: string) => {
    try {
      await BaseCrudService.delete('storages', storageId);
      loadData();
    } catch (error) {
      console.error('Error deleting storage:', error);
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar groups={groups} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">My Storages</h1>
            <p className="text-secondary font-paragraph">Manage your connected storage solutions</p>
          </div>

          {/* Storages Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-foreground">Connected Storages</h2>
              <Dialog open={isAddStorageOpen} onOpenChange={setIsAddStorageOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-blue-600 text-primary-foreground font-heading">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Storage
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-800 text-foreground">
                  <DialogHeader>
                    <DialogTitle className="font-heading">Connect Storage</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-heading text-foreground mb-2 block">Storage Name</label>
                      <Input
                        value={newStorageName}
                        onChange={(e) => setNewStorageName(e.target.value)}
                        placeholder="e.g., My Google Drive"
                        className="bg-gray-800 border-gray-700 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-heading text-foreground mb-2 block">Storage Type</label>
                      <select
                        value={newStorageType}
                        onChange={(e) => setNewStorageType(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded text-foreground p-2"
                      >
                        <option>Google Drive</option>
                        <option>Dropbox</option>
                        <option>OneDrive</option>
                        <option>AWS S3</option>
                      </select>
                    </div>
                    <p className="text-xs text-secondary">
                      You'll be redirected to {newStorageType} to authorize access.
                    </p>
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddStorageOpen(false)}
                        className="flex-1 bg-gray-800 border-gray-700 text-foreground hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddStorage}
                        className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground font-heading"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {storages.length > 0 ? (
                storages.map(storage => {
                  const usagePercent = storage.totalCapacity ? (storage.usedCapacity || 0) / storage.totalCapacity * 100 : 0;
                  return (
                    <div key={storage._id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-teal to-neon-magenta flex items-center justify-center">
                            <HardDrive className="w-6 h-6 text-black" />
                          </div>
                          <div>
                            <h3 className="font-heading text-foreground">{storage.storageName}</h3>
                            <p className="text-sm text-secondary">{storage.storageType}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                            <DropdownMenuItem className="text-foreground cursor-pointer">
                              Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-400 cursor-pointer"
                              onClick={() => handleDeleteStorage(storage._id)}
                            >
                              Disconnect
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-secondary">
                            {formatBytes(storage.usedCapacity || 0)} / {formatBytes(storage.totalCapacity || 0)}
                          </span>
                          <span className="text-secondary">{Math.round(usagePercent)}%</span>
                        </div>
                        <Progress value={usagePercent} className="h-2" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
                  <p className="text-secondary font-paragraph">No storages connected yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* P2P Devices Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-heading text-foreground">P2P Devices</h2>
              <AddDeviceModal open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen} onDeviceAdded={loadData} />
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="border-gray-700">
                    <TableHead className="text-foreground font-heading">Device Name</TableHead>
                    <TableHead className="text-foreground font-heading">Type</TableHead>
                    <TableHead className="text-foreground font-heading">Status</TableHead>
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
                      <TableCell colSpan={5} className="text-center py-8 text-secondary">
                        No devices registered yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
