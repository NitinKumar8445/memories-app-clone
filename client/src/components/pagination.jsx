import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../reducers/postSlice';

const Paginate = () => {
    const { numberOfPages, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '1';

    useEffect(() => {
        dispatch(getPosts(page));
    }, [dispatch, page]);

    return (
        <Pagination
            sx={{
                borderRadius:1,
                padding:'10px',
            }}
            count={numberOfPages}
            page={Number(page)}
            variant="outlined"
            color="primary"
            disabled={isLoading}  // Disable pagination while loading
            renderItem={(item) => (
                <PaginationItem 
                    {...item} 
                    component={Link} 
                    to={`/posts?page=${item.page}`} 
                />
            )}
        />
    );
};

export default Paginate;