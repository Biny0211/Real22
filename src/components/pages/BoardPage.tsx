import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface BoardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: Date;
}

export default function BoardPage() {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Initialize with sample data
    const sampleItems: BoardItem[] = [
      {
        id: '1',
        title: 'Implement file encryption',
        description: 'Add end-to-end encryption for all uploaded files',
        category: 'Feature',
        priority: 'high',
        status: 'in-progress',
        createdAt: new Date('2024-12-01'),
      },
      {
        id: '2',
        title: 'Improve dashboard UI',
        description: 'Redesign dashboard for better user experience',
        category: 'UI/UX',
        priority: 'medium',
        status: 'todo',
        createdAt: new Date('2024-12-02'),
      },
      {
        id: '3',
        title: 'Add multi-language support',
        description: 'Support for 10+ languages',
        category: 'Feature',
        priority: 'medium',
        status: 'todo',
        createdAt: new Date('2024-12-03'),
      },
      {
        id: '4',
        title: 'Fix mobile responsiveness',
        description: 'Ensure all pages work on mobile devices',
        category: 'Bug Fix',
        priority: 'high',
        status: 'in-progress',
        createdAt: new Date('2024-12-04'),
      },
      {
        id: '5',
        title: 'Optimize database queries',
        description: 'Improve query performance by 50%',
        category: 'Performance',
        priority: 'medium',
        status: 'done',
        createdAt: new Date('2024-11-28'),
      },
      {
        id: '6',
        title: 'Add API documentation',
        description: 'Complete API documentation with examples',
        category: 'Documentation',
        priority: 'low',
        status: 'done',
        createdAt: new Date('2024-11-25'),
      },
    ];
    setItems(sampleItems);
  }, []);

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900 text-red-200';
      case 'medium':
        return 'bg-yellow-900 text-yellow-200';
      case 'low':
        return 'bg-green-900 text-green-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-900 text-green-200';
      case 'in-progress':
        return 'bg-blue-900 text-blue-200';
      case 'todo':
        return 'bg-gray-700 text-gray-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-foreground mb-4">
              Project Board
            </h1>
            <p className="text-xl text-secondary font-paragraph max-w-2xl mx-auto">
              Track development progress, manage tasks, and collaborate with your team in real-time
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-secondary" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-foreground"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-foreground font-paragraph"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 bg-gray-800 rounded border border-gray-700 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <Button className="bg-primary hover:bg-blue-600 text-primary-foreground font-heading">
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          {/* Board Content */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-neon-teal transition-colors cursor-pointer h-full">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-heading text-foreground flex-1">{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>

                      <p className="text-secondary font-paragraph text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300 font-paragraph">
                          {item.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="text-xs text-secondary font-paragraph">
                        Created {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-neon-teal transition-colors cursor-pointer">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-heading text-foreground mb-1">{item.title}</h3>
                        <p className="text-secondary font-paragraph text-sm">{item.description}</p>
                      </div>

                      <div className="flex items-center gap-3 ml-4">
                        <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300 font-paragraph">
                          {item.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary font-paragraph text-lg">No tasks found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-[120rem] mx-auto">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-8 text-center">Board Statistics</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Total Tasks', value: items.length, color: 'from-neon-teal to-primary' },
              { label: 'In Progress', value: items.filter(i => i.status === 'in-progress').length, color: 'from-blue-500 to-blue-600' },
              { label: 'Completed', value: items.filter(i => i.status === 'done').length, color: 'from-green-500 to-green-600' },
              { label: 'High Priority', value: items.filter(i => i.priority === 'high').length, color: 'from-red-500 to-red-600' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 p-6 text-center">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-secondary font-paragraph">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
