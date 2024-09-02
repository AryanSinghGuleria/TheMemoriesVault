import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useLocation, useNavigate } from 'react-router';
import useStyles from './styles';
import { MuiChipsInput } from 'mui-chips-input';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const searchPost = () => {
        if (search.trim() || tags) {
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate("/");
        }
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    const handleKeyPress = (e) => {

        if (e.keyCode === 13) {
            // search post
            searchPost();
        }
    };

    const handleAdd = (tag) => {

        setTags([...tags, tag]);
        console.log(tag);
    }
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


    return (
        <>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid className='classes.gridContainer' container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField name='search' variant='outlined' value={search}
                                    label="Search Memories" fullWidth
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    onKeyDown={(e) => { if (e.key === "Enter") { handleKeyPress(e) } }}
                                />

                                <MuiChipsInput style={{ margin: '10px 0' }}
                                    label="Search Tags" value={tags} onAddChip={handleAdd}
                                    onDeleteChip={handleDelete} variant='outlined' />

                                <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'
                                >Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                                <Paper className={classes.pagination} elevation={6}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </>
    );
};

export default Home;