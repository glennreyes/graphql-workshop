'use client';

import { useMutation } from '@apollo/client/react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { LikePostDocument, UnlikePostDocument } from '@/graphql/generated/graphql';

interface LikeButtonProps {
  postId: string;
  isLikedByMe: boolean;
  likesCount: number;
}

export function LikeButton({ postId, isLikedByMe, likesCount }: LikeButtonProps) {
  const [likePost] = useMutation(LikePostDocument, {
    variables: { postId },
    optimisticResponse: {
      likePost: {
        __typename: 'Post',
        id: postId,
        likesCount: likesCount + 1,
        isLikedByMe: true,
      },
    },
  });

  const [unlikePost] = useMutation(UnlikePostDocument, {
    variables: { postId },
    optimisticResponse: {
      unlikePost: {
        __typename: 'Post',
        id: postId,
        likesCount: Math.max(0, likesCount - 1),
        isLikedByMe: false,
      },
    },
  });

  const handleClick = () => {
    if (isLikedByMe) {
      unlikePost();
    } else {
      likePost();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="flex items-center gap-2 hover:text-red-500"
          >
            <Heart className={`h-5 w-5 transition-all ${isLikedByMe ? 'fill-red-500 text-red-500' : ''}`} />
            {likesCount > 0 && <span className="text-sm">{likesCount}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLikedByMe ? 'Unlike' : 'Like'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
