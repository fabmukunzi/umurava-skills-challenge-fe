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
  useGetUsersQuery,
} from '@/store/actions/setting';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Section } from '@/components/common/dashboard/setting-section';
import { Column, DataTable } from '@/components/common/dashboard/data-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { handleError } from '@/lib/errorHandler';
import { UserSchema } from '@/lib/types/user';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const columns: Column<SystemLog>[] = [
  {
    header: 'Method',
    render: (log) => (
      <span
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
      </span>
    ),
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (item) => (
      <Badge
        className={`${
          item.status === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white rounded-lg`}
      >
        {item.status}
      </Badge>
    ),
  },
  { header: 'Status Code', accessor: 'statusCode' },
  {
    header: 'URL',
    render: (log) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="truncate max-w-[200px]">
            {log.url}
          </TooltipTrigger>
          <TooltipContent>
            <p>{log.url}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  { header: 'Details', accessor: 'details' },
  { header: 'IP Address', accessor: 'ipAddress' },
  { header: 'Duration', accessor: 'duration' },
  { header: 'Done By', accessor: 'doneBy' },
  {
    header: 'Timestamp',
    render: (log) => dayjs(log.timestamp).format('DD-MMM-YYYY'),
  },
];

const userColumns: Column<UserSchema>[] = [
  {
    header: '',
    accessor: 'profile_url',
    render: (user) => (
      <Image
        src={user.profile_url}
        alt={user.names}
        width={100}
        height={100}
        className="w-10 h-10 object-cover rounded-full"
      />
    ),
  },
  { header: 'Name', accessor: 'names' },
  { header: 'Email', accessor: 'email' },
  {
    header: 'Role',
    accessor: 'userRole',
    render: (user) => (
      <Badge
        className={`${
          user.userRole === 'admin' ? 'bg-green-500' : 'bg-primary'
        } text-white rounded-lg`}
      >
        {user.userRole}
      </Badge>
    ),
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (user) => (
      <Switch
        checked={user.status === 'active'}
        // onCheckedChange={() => toggleStatus(user)}
      />
    ),
  },
];

const ITEMS_PER_PAGE = 10;
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('skills');
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [skillPage, setSkillPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);
  const [prizePage, setPrizePage] = useState(1);
  const [logsPage, setLogsPage] = useState(1);
  const [userPage, setUserPage] = useState(1);

  const {
    data: skills,
    isLoading: isSkillsLoading,
    isFetching: isSkillsFetching,
  } = useGetSkillsQuery({ params: { limit: ITEMS_PER_PAGE, page: skillPage } });
  const [addSkill, { isLoading: isAddingSkill }] = useAddSkillMutation();
  const [deleteSkill, { isLoading: isDeletingSkill }] =
    useDeleteSkillMutation();
  const [updateSkill, { isLoading: isUpdatingSkill }] =
    useUpdateSkillMutation();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
  } = useGetCategoriesQuery({
    params: { limit: ITEMS_PER_PAGE, page: categoryPage },
  });
  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [deleteCategory, { isLoading: isDeletingCategory }] =
    useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdatingCategory }] =
    useUpdateCategoryMutation();

  const {
    data: prizes,
    isLoading: isPrizesLoading,
    isFetching: isPrizesFetching,
  } = useGetPrizesQuery({ params: { limit: ITEMS_PER_PAGE, page: prizePage } });
  const [addPrize, { isLoading: isAddingPrize }] = useAddPrizeMutation();
  const [deletePrize, { isLoading: isDeletingPrize }] =
    useDeletePrizeMutation();
  const [updatePrize, { isLoading: isUpdatingPrize }] =
    useUpdatePrizeMutation();

  const {
    data: systemLogs,
    isLoading: isLogsLoading,
    isFetching: isLogsFetching,
  } = useGetSystemLogsQuery({
    params: { limit: ITEMS_PER_PAGE, page: logsPage },
  });

  const { data: users } = useGetUsersQuery({
    params: { limit: ITEMS_PER_PAGE, page: userPage },
  });

  const isSkillTabLoading = isSkillsLoading || isSkillsFetching;
  const isCategoryTabLoading = isCategoriesLoading || isCategoriesFetching;
  const isPrizeTabLoading = isPrizesLoading || isPrizesFetching;
  const isLogsTabLoading = isLogsLoading || isLogsFetching;

  const renderLoader = () => (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-full overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">App controls</h1>

      <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
        {['skills', 'categories', 'prizes', 'system logs', 'users'].map(
          (tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab)}
              className="text-sm"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          )
        )}
      </div>

      <div className="w-full">
        {activeTab === 'skills' &&
          (isSkillTabLoading ? (
            renderLoader()
          ) : (
            <Section
              title="Skills"
              items={skills?.data?.skills || []}
              isAddLoading={isAddingSkill}
              isUpdateLoading={isUpdatingSkill}
              isDeleteLoading={isDeletingSkill}
              pagination={skills?.data?.pagination}
              onPageChange={(page) => setSkillPage(page)}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setIsEditOpen={setIsEditOpen}
              isEditOpen={isEditOpen}
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              onAdd={async (val) => {
                try {
                  await addSkill({ skillName: val }).unwrap();
                  setIsOpen(false);
                } catch (error) {
                  setIsOpen(false);
                  handleError(error);
                }
              }}
              onDelete={async (id) => {
                try {
                  await deleteSkill(id).unwrap();
                  setConfirmOpen(false);
                } catch (error) {
                  handleError(error);
                }
              }}
              onUpdate={async (id, newVal) => {
                try {
                  await updateSkill({ id, skillName: newVal }).unwrap();
                  setIsEditOpen(false);
                } catch (error) {
                  setIsOpen(false);
                  handleError(error);
                }
              }}
              placeholder="Add a new skill"
            />
          ))}

        {activeTab === 'categories' &&
          (isCategoryTabLoading ? (
            renderLoader()
          ) : (
            <Section
              title="Challenge Categories"
              items={categories?.data?.categories || []}
              isAddLoading={isAddingCategory}
              isUpdateLoading={isUpdatingCategory}
              isDeleteLoading={isDeletingCategory}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onPageChange={(page) => setCategoryPage(page)}
              pagination={categories?.data?.pagination}
              setIsEditOpen={setIsEditOpen}
              isEditOpen={isEditOpen}
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              onAdd={async (val) => {
                try {
                  await addCategory({ challengeCategoryName: val }).unwrap();
                  setIsOpen(false);
                } catch (error) {
                  setIsOpen(false);
                  handleError(error);
                }
              }}
              onDelete={async (id) => {
                try {
                  await deleteCategory(id).unwrap();
                  setConfirmOpen(false);
                } catch (error) {
                  handleError(error);
                }
              }}
              onUpdate={async (id, newVal) => {
                try {
                  await updateCategory({
                    id,
                    challengeCategoryName: newVal,
                  }).unwrap();
                  setIsEditOpen(false);
                } catch (error) {
                  setIsEditOpen(false);
                  handleError(error);
                }
              }}
              placeholder="Add a challenge category"
            />
          ))}

        {activeTab === 'prizes' &&
          (isPrizeTabLoading ? (
            renderLoader()
          ) : (
            <Section
              title="Prize Categories"
              items={prizes?.data?.categories || []}
              isAddLoading={isAddingPrize}
              isUpdateLoading={isUpdatingPrize}
              isDeleteLoading={isDeletingPrize}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setIsEditOpen={setIsEditOpen}
              pagination={prizes?.data?.pagination}
              onPageChange={(page) => setPrizePage(page)}
              isEditOpen={isEditOpen}
              confirmOpen={confirmOpen}
              setConfirmOpen={setConfirmOpen}
              onAdd={async (val) => {
                try {
                  const [name, currency = 'USD'] = val.split('@');
                  await addPrize({
                    prizeName: name.trim(),
                    currency: currency.trim(),
                    description: 'N/A',
                  }).unwrap();
                  setIsOpen(false);
                } catch (error) {
                  setIsOpen(false);
                  handleError(error);
                }
              }}
              onDelete={async (id) => {
                try {
                  await deletePrize(id).unwrap();
                  setConfirmOpen(false);
                } catch (error) {
                  handleError(error);
                }
              }}
              onUpdate={async (id, newVal, currency) => {
                try {
                  await updatePrize({
                    id,
                    prizeName: newVal,
                    currency: currency || 'RWF',
                    description: 'N/A',
                  }).unwrap();
                  setIsEditOpen(false);
                } catch (error) {
                  setIsEditOpen(false);
                  handleError(error);
                }
              }}
              placeholder="e.g RWF"
            />
          ))}

        {activeTab === 'system logs' &&
          (isLogsTabLoading ? (
            renderLoader()
          ) : (
            <Card className="mt-6 max-sm:!w-[360px] md:w-[75vw] overflow-x-auto">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={systemLogs?.data?.audits || []}
                  columns={columns}
                  pagination={systemLogs?.data?.pagination}
                  onPageChange={(page) => setLogsPage(page)}
                  loading={isLogsTabLoading}
                />
              </CardContent>
            </Card>
          ))}

        {activeTab === 'users' &&
          (isLogsTabLoading ? (
            renderLoader()
          ) : (
            <Card className="mt-6 max-sm:!w-[360px] md:w-full overflow-x-auto">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={users?.data.users || []}
                  columns={userColumns}
                  pagination={users?.data?.pagination}
                  onPageChange={(page) => setUserPage(page)}
                  loading={isLogsTabLoading}
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
