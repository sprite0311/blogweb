import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../actions/blogs'

const Paginate = ({page}) => {
    const {numberOfPages} = useSelector((state)=> state.blogs)
    const dispatch = useDispatch()
    const classes = useStyles()
    useEffect(()=>{
        if(page) dispatch(getBlogs(page))
    }, [page, dispatch])
    return (
        <Pagination
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color='primary'
            renderItem={(item)=>(<PaginationItem {...item} component={Link} to={`/blogs?page=${item.page}`}/>)}
        />
    )
}

export default Paginate