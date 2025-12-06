import { useState } from 'react';
import { useMember } from '@/integrations';
import { Groups } from '@/entities';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bell, LogOut, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CreateGroupModal from '@/components/CreateGroupModal';

interface SidebarProps {
  groups: Groups[];
}

export default function Sidebar({ groups }: SidebarProps) {
  const { member, actions } = useMember();
  const [isGroupsOpen, setIsGroupsOpen] = useState(true);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      {/* Profile Section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-teal to-neon-magenta flex items-center justify-center">
            <span className="text-sm font-bold text-black">
              {member?.profile?.nickname?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-heading text-foreground truncate">
              {member?.profile?.nickname || 'User'}
            </p>
            <p className="text-xs text-secondary truncate">
              {member?.loginEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link to="/dashboard">
          <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-gray-800">
            Dashboard
          </Button>
        </Link>
        <Link to="/files">
          <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-gray-800">
            Files
          </Button>
        </Link>
        <Link to="/storages">
          <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-gray-800">
            My Storages
          </Button>
        </Link>
        <Link to="/devices">
          <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-gray-800">
            P2P Devices
          </Button>
        </Link>

        {/* Groups Section */}
        <div className="pt-4 border-t border-gray-800">
          <Collapsible open={isGroupsOpen} onOpenChange={setIsGroupsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between text-foreground hover:bg-gray-800">
                <span className="font-heading">My Groups</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isGroupsOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {groups.length > 0 ? (
                groups.map(group => (
                  <Button
                    key={group._id}
                    variant="ghost"
                    className="w-full justify-start text-sm text-secondary hover:text-foreground hover:bg-gray-800 pl-6"
                  >
                    {group.groupName}
                  </Button>
                ))
              ) : (
                <p className="text-xs text-secondary px-4 py-2">No groups yet</p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-neon-teal hover:bg-gray-800 pl-6"
                onClick={() => setIsCreateGroupOpen(true)}
              >
                <Plus className="w-3 h-3 mr-2" />
                New Group
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-secondary hover:text-foreground hover:bg-gray-800">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
          onClick={actions.logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <CreateGroupModal open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 sticky top-0 h-screen">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-gray-900 border-gray-800">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
