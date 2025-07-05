'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar } from '@/components/ui/Avatar';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
  };
  replies: Comment[];
}

interface CommentSectionProps {
  articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id || !newComment.trim()) return;

    setSubmitting(true);
    setSuccessMsg('');
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment.trim() })
      });

      if (response.ok) {
        setNewComment('');
        setSuccessMsg('Bình luận của bạn đã gửi và đang chờ duyệt!');
        fetchComments();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!session?.user?.id || !replyContent.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: replyContent.trim(),
          parentId 
        })
      });

      if (response.ok) {
        setReplyContent('');
        setReplyingTo(null);
        fetchComments();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Có lỗi xảy ra');
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

  // Card comment style
  const commentCardClass =
    "bg-white dark:bg-[#23272f] border-2 border-amber-100 dark:border-amber-700 shadow-2xl rounded-2xl p-7 mb-6 flex flex-col gap-2 text-base text-gray-900 dark:text-white font-semibold transition-all duration-150";

  const renderComment = (comment: Comment, level = 0) => (
    <div key={comment.id} className={`${level > 0 ? 'ml-6 border-l-2 border-amber-200 dark:border-amber-800 pl-4' : ''}`}>
      <div className={commentCardClass}>
        <div className="flex items-start gap-3">
          <Avatar 
            src={comment.user.avatar} 
            alt={`${comment.user.firstName} ${comment.user.lastName}`}
            className="w-10 h-10"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Text className="font-bold text-amber-700 dark:text-amber-300 text-lg">
                {comment.user.firstName} {comment.user.lastName}
              </Text>
              {comment.user.role === 'admin' && (
                <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded font-bold">
                  Admin
                </span>
              )}
              <Text className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                {formatDate(comment.createdAt)}
              </Text>
            </div>
            <Text className="text-gray-800 dark:text-gray-200 mb-3 text-base font-medium">
              {comment.content}
            </Text>
            {session?.user?.id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-amber-600 hover:text-amber-700 dark:text-amber-400 font-semibold"
              >
                Trả lời
              </Button>
            )}
          </div>
        </div>
        {replyingTo === comment.id && (
          <div className="mt-4 pl-13">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitReply(comment.id); }}>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết trả lời..."
                className="mb-2 bg-white dark:bg-[#23272f] border-2 border-amber-300 dark:border-amber-700 rounded-xl text-gray-900 dark:text-white text-base px-4 py-3 placeholder-gray-400 font-medium"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={submitting || !replyContent.trim()}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold px-6 py-2 rounded-xl shadow-lg text-base border-2 border-amber-400 dark:border-amber-600"
                >
                  {submitting ? 'Đang gửi...' : 'Gửi trả lời'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Section className="py-12 bg-gradient-to-br from-amber-50 to-green-50 dark:from-gray-900 dark:to-gray-800 min-h-[500px]">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HiChatBubbleLeftRight className="text-4xl text-amber-500" />
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Bình luận <span className="text-amber-500">({comments.length})</span>
            </h2>
          </div>

          {/* Success message */}
          {successMsg && (
            <div className="mb-7 flex items-center gap-2 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 shadow-xl text-lg font-semibold">
              <FaRegCheckCircle className="text-2xl text-green-500" />
              {successMsg}
            </div>
          )}

          {/* Comment Form */}
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-900 border-2 border-amber-200 dark:border-amber-700 shadow-2xl rounded-3xl p-10 flex flex-col gap-6">
              {session?.user?.id ? (
                <form onSubmit={handleSubmitComment} className="flex flex-col gap-6">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    className="bg-white dark:bg-gray-900 border-2 border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 rounded-2xl text-gray-900 dark:text-white text-lg px-5 py-4 transition-all duration-150 shadow-md placeholder-gray-400"
                    rows={4}
                  />
                  <Button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl text-xl transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:from-amber-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-amber-600 border-2 border-amber-400 dark:border-amber-600"
                  >
                    {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
                    <FiSend className="text-2xl ml-1" />
                  </Button>
                </form>
              ) : (
                <Text className="text-gray-600 dark:text-gray-400 text-lg text-center">
                  Vui lòng <a href="/login" className="text-amber-600 hover:text-amber-700 font-semibold underline">đăng nhập</a> để bình luận
                </Text>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-8">
            {comments.length === 0 ? (
              <div className="p-10 text-center bg-white border-2 border-amber-200 shadow-2xl rounded-3xl flex flex-col items-center gap-2">
                <HiChatBubbleLeftRight className="text-5xl text-amber-300 mb-2" />
                <Text className="text-gray-500 dark:text-gray-400 text-lg">
                  Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                </Text>
              </div>
            ) : (
              comments.map(comment => renderComment(comment))
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
} 