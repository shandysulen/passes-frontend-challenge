import { Button, HStack, Image, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { formatLikes } from '../utils';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import confetti from 'canvas-confetti';
import { APIResponse } from '../types';

const showConfetti = () => confetti({
    particleCount: 10,
    spread: 10,
    origin: { x: 0.5, y: 0.5 },
});

export const LikeButton: React.FC = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState<undefined | null | number>(undefined);
    const debouncedIsLiked = useDebounce(isLiked, 300);

    // Determine if user has already liked
    useEffect(() => {
        const fetchUserLike = async () => {
            try {
                const hasUserLiked = (await axios.get<APIResponse<boolean>>(`http://localhost:3001/api/v1/like/1/user/shando`)).data.data;
                setIsLiked(hasUserLiked);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserLike();
    }, []);

    // Get initial count and subsequent counts when user toggles button
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const fetchedLikes = (await axios.get<APIResponse<number>>(`http://localhost:3001/api/v1/like/1/count`)).data.data;
                setNumLikes(fetchedLikes);
            } catch (err) {
                console.error(err);
                setNumLikes(null);
            }
        };

        fetchLikes();
    }, [isLiked]); // Could also increment/decrement locally -- depends on business requirements

    // Add or remove like
    const toggleLike = useCallback(() => {
        const toggle = async () => {
            try {
                await axios.post(
                    `http://localhost:3001/api/v1/like/${isLiked ? 'remove' : 'add'}`,
                    { likeId: 1, userId: 'shando' }
                );

                setIsLiked(state => !state);
                showConfetti();
            } catch (err) {
                console.error(err);
            }
        };

        toggle();
    }, [debouncedIsLiked]);

    const formattedLikes = useMemo(() => {
        if (numLikes === undefined) {
            return 'Loading...';
        }

        if (numLikes === null) {
            return 'Unable to fetch...';
        }

        return formatLikes(numLikes);
    }, [numLikes]);

    return (
        <HStack spacing='0'>
            <Button
                bg='transparent'
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
                p='0'
            >
                <Image
                    src={isLiked ? '/heart-icon-red.svg' : '/heart-icon.svg'}
                    onClick={toggleLike}
                />
            </Button>
            <Text>{formattedLikes}</Text>
        </HStack>
    );
};
