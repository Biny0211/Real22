import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Files, Groups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, MoreVertical, Search, Filter } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import AddFileModal from '@/components/AddFileModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DashboardPage() {
  const { member } = useMember();
  const [files, setFiles] = useState<Files[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isAddFileOpen, setIsAddFileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, [member]);

  const loadData = async () => {
    try {
      if (member?._id) {
        // Load files for current user
        const { items: filesData } = await BaseCrudService.getAll<Files>('files');
        const userFiles = filesData.filter(f => f.createdBy === member._id);
        setFiles(userFiles);

        // Load groups for current user
        const { items: groupsData } = await BaseCrudService.getAll<Groups>('groups');
        const userGroups = groupsData.filter(g => g.creator === member._id);
        setGroups(userGroups);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleFileAdded = () => {
    setIsAddFileOpen(false);
    loadData();
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await BaseCrudService.delete('files', fileId);
      loadData();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // Filter files
  let filteredFiles = files;
  if (selectedGroup !== 'all') {
    filteredFiles = files.filter(f => f.groupId === selectedGroup);
  }
  if (searchTerm) {
    filteredFiles = filteredFiles.filter(f =>
      f.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.keywords?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Pagination
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar groups={groups} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-heading text-foreground mb-2">Dashboard</h1>
            <p className="text-secondary font-paragraph">Manage your files and storage</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-secondary" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 bg-gray-800 border-gray-700 text-foreground"
              />
            </div>

            <Select value={selectedGroup} onValueChange={(value) => {
              setSelectedGroup(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-foreground">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Groups</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group._id} value={group._id || ''}>
                    {group.groupName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <AddFileModal open={isAddFileOpen} onOpenChange={setIsAddFileOpen} onFileAdded={handleFileAdded} groups={groups} />
          </div>

          {/* Files Table */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-800">
                <TableRow className="border-gray-700">
                  <TableHead className="text-foreground font-heading">File Name</TableHead>
                  <TableHead className="text-foreground font-heading">Group</TableHead>
                  <TableHead className="text-foreground font-heading">Keywords</TableHead>
                  <TableHead className="text-foreground font-heading">Created</TableHead>
                  <TableHead className="text-foreground font-heading">Status</TableHead>
                  <TableHead className="text-right text-foreground font-heading">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFiles.length > 0 ? (
                  paginatedFiles.map(file => (
                    <TableRow key={file._id} className="border-gray-700 hover:bg-gray-800">
                      <TableCell className="text-foreground font-paragraph">{file.fileName}</TableCell>
                      <TableCell className="text-secondary font-paragraph">
                        {groups.find(g => g._id === file.groupId)?.groupName || 'Uncategorized'}
                      </TableCell>
                      <TableCell className="text-secondary font-paragraph text-sm">{file.keywords}</TableCell>
                      <TableCell className="text-secondary font-paragraph text-sm">
                        {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          file.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                        }`}>
                          {file.status || 'pending'}
                        </span>
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
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground cursor-pointer">
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-400 cursor-pointer"
                              onClick={() => handleDeleteFile(file._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-secondary">
                      No files found. Start by uploading a new file.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-gray-800 border-gray-700 text-foreground hover:bg-gray-700"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'bg-primary' : 'bg-gray-800 border-gray-700 text-foreground hover:bg-gray-700'}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-gray-800 border-gray-700 text-foreground hover:bg-gray-700"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
