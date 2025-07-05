'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { Avatar } from '@/components/ui/Avatar';
import { Pagination } from '@/components/ui/Pagination';
import { toast } from 'react-hot-toast';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  isApproved: boolean;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
  };
  article: {
    id: number;
    title: string;
  };
  parent?: {
    id: number;
    content: string;
  };
}

export default function AdminCommentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.id || session.user.role !== 'admin') {
      router.push('/login');
      return;
    }
    fetchComments();
  }, [session, status, page, filterStatus, search]);

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(filterStatus !== 'all' && { status: filterStatus }),
        ...(search && { search })
      });

      const response = await fetch(`/api/admin/comments?${params}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (commentId: number, isApproved: boolean) => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/comments/${commentId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved })
      });

      if (response.ok) {
        fetchComments();
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error approving comment:', error);
      toast.error('Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa bình luận này?')) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchComments();
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveAll = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/comments/approve-all', { method: 'PATCH' });
      if (response.ok) {
        toast.success('Đã duyệt tất cả bình luận chờ duyệt!');
        fetchComments();
      } else {
        toast.error('Có lỗi khi duyệt tất cả bình luận');
      }
    } catch (error) {
      toast.error('Có lỗi khi duyệt tất cả bình luận');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading' || loading) {
    return (
      <Section className="py-8">
        <Container>
          <div className="text-center">Đang tải...</div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quản lý bình luận
            </h1>
            <div className="flex gap-3">
              <Button
                onClick={handleApproveAll}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              >
                Duyệt tất cả
              </Button>
              <Button
                onClick={() => router.push('/admin')}
                variant="outline"
              >
                Quay lại Dashboard
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-64">
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo nội dung..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
              </Select>
            </div>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <Card className="p-6 text-center">
                <Text className="text-gray-500 dark:text-gray-400">
                  Không có bình luận nào
                </Text>
              </Card>
            ) : (
              comments.map(comment => (
                <Card key={comment.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={comment.user.avatar}
                      alt={`${comment.user.firstName} ${comment.user.lastName}`}
                      className="w-12 h-12"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Text className="font-semibold text-amber-600 dark:text-amber-400">
                          {comment.user.firstName} {comment.user.lastName}
                        </Text>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded">
                          {comment.user.role}
                        </span>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(comment.createdAt)}
                        </Text>
                        {comment.parent && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded">
                            Trả lời
                          </span>
                        )}
                      </div>
                      
                      <Text className="text-gray-700 dark:text-gray-300 mb-3">
                        {comment.content}
                      </Text>
                      
                      {comment.parent && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
                          <Text className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Trả lời:</strong> {comment.parent.content}
                          </Text>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          Bài viết: <a 
                            href={`/articles/${comment.article.id}`}
                            className="text-amber-600 hover:text-amber-700 dark:text-amber-400"
                          >
                            {comment.article.title}
                          </a>
                        </Text>
                      </div>

                      <div className="flex gap-2">
                        {!comment.isApproved ? (
                          <Button
                            onClick={() => handleApprove(comment.id, true)}
                            disabled={submitting}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Duyệt
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleApprove(comment.id, false)}
                            disabled={submitting}
                            variant="outline"
                          >
                            Bỏ duyệt
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDelete(comment.id)}
                          disabled={submitting}
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
} 