import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { NavLink } from "react-router-dom";

import { getPosts } from "../actions/posts";
import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [dispatch, page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages} page={Number(page) || 1} variant="outlined"
            color="primary" renderItem={(item) => (
                <NavLink to={`/posts?page=${item.page}`}><PaginationItem {...item} /></NavLink>
            )}
        />
    );
};


export default Paginate;
