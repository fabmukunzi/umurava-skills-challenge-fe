'use client';

import {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetPrizesQuery,
  useAddPrizeMutation,
  useDeletePrizeMutation,
  useUpdatePrizeMutation,
  useGetSystemLogsQuery,
  SystemLog,
} from '@/store/actions/setting';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Section } from '@/components/common/dashboard/setting-section';


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('skills');

  const { data: skills } = useGetSkillsQuery();
  const [addSkill] = useAddSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();

  const { data: categories } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const { data: prizes } = useGetPrizesQuery();
  const [addPrize] = useAddPrizeMutation();
  const [deletePrize] = useDeletePrizeMutation();
  const [updatePrize] = useUpdatePrizeMutation();

  const { data: systemLogs } = useGetSystemLogsQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="flex space-x-4 mb-6">
        {['skills', 'categories', 'prizes', 'logs'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === 'skills' && (
        <Section
          title="Skills"
          items={skills?.data || []}
          onAdd={(val) => addSkill({ skillName: val })}
          onDelete={(id) => deleteSkill(id)}
          onUpdate={(id, newVal) => updateSkill({ id, skillName: newVal })}
          placeholder="Add a new skill"
        />
      )}

      {activeTab === 'categories' && (
        <Section
          title="Challenge Categories"
          items={categories?.data || []}
          onAdd={(val) => addCategory({ challengeCategoryName: val })}
          onDelete={(id) => deleteCategory(id)}
          onUpdate={(id, newVal) =>
            updateCategory({ id, challengeCategoryName: newVal })
          }
          placeholder="Add a challenge category"
        />
      )}

      {activeTab === 'prizes' && (
        <Section
          title="Prize Categories"
          items={prizes?.data || []}
          onAdd={(val) =>
            addPrize({ prizeName: val, currency: 'RWF', description: 'N/A' })
          }
          onDelete={(id) => deletePrize(id)}
          onUpdate={(id, newVal) =>
            updatePrize({
              id,
              prizeName: newVal,
              currency: 'RWF',
              description: 'N/A',
            })
          }
          placeholder="Category name"
        />
      )}

      {activeTab === 'logs' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Status Code</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemLogs?.data?.map((log: SystemLog) => (
                  <TableRow key={log._id}>
                    <TableCell
                      className={`font-semibold ${
                        log.method === 'GET'
                          ? 'text-blue-600'
                          : log.method === 'POST'
                          ? 'text-green-600'
                          : log.method === 'PUT'
                          ? 'text-yellow-600'
                          : log.method === 'DELETE'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {log.method}
                    </TableCell>
                    <TableCell>{log.statusCode}</TableCell>
                    <TableCell className="truncate max-w-[200px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{log.url}</TooltipTrigger>
                          <TooltipContent>
                            <p>{log.url}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>
                      {dayjs(log.timestamp).format('DD-MMM-YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
