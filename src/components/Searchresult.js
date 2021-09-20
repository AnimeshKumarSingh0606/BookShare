
import React, { useState } from 'react';
import {posts} from './dummydata';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@mui/material/Fab';
import { semester,branchname } from './dummydata';
import './Searchresult.css';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 300,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeader :{
        position:'sticky',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        position:'sticky',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: { 
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));



function MTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [viewbook, setviewbook] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleclick=(event)=>{
    setviewbook(event.target.specificpost.value);
    // console.log(event.target.specificpost.value);
    console.log(viewbook);
  };

  const nothing=()=>{
    console.log("hi");
  };

  const [semesterstate,setsemesterstate]=useState("Semester");

  return (
    
  <>

    

    <div className="entirebody">

    <div className="selectsection">
        <div className="firstsec">
            <span className="title">Select Branch</span>
            <div className="selectstyle">
            <select className="selecttag" value={semesterstate} onChange={(e)=>{
                            setsemesterstate(e.target.value);
                        }}  >
                        {semester.map((sem)=>{
                            return(
                                <option value={sem.value}>{sem.sem}</option>
                            );
                        })}
            </select>
            </div>
        </div>
        <div className="firstsec">
        <span className="title">Select Branch</span>
            <div className="selectstyle">
            <select className="selecttag" value={semesterstate} onChange={(e)=>{
                            setsemesterstate(e.target.value);
                        }}  >
                        {branchname.map((branch)=>{
                            return(
                                <option value={branch.value}>{branch.bname}</option>
                            );
                        })}
            </select>
            </div>
          </div>
          <div className="btnsec">
            <button className="filterbtn" type="submit" >Filter</button>
          </div>
    </div>

    <TableContainer component={Paper} className={classes.tableContainer} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
          <TableCell className={classes.tableHeaderCell}>SR NO.</TableCell>
            <TableCell className={classes.tableHeaderCell}>BOOK INFO</TableCell>
            <TableCell className={classes.tableHeaderCell}>OWNER INFO</TableCell>
            <TableCell className={classes.tableHeaderCell}>SEMESTER</TableCell>
            <TableCell className={classes.tableHeaderCell}>SUBJECT</TableCell>
            <TableCell className={classes.tableHeaderCell}>VIEW DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post,index) => (
            <TableRow className={(index%2==0)?"oddrow":""} key={post.postid}>
              <TableCell>
                  {page * rowsPerPage+index+1}
                </TableCell>
              <TableCell>
                  {post.bookdetails}
                </TableCell>
              <TableCell>{post.owner}</TableCell>
              <TableCell>
                  {post.booksem}
                </TableCell>
                <TableCell>
                  {post.booksubject}
                </TableCell>
                <TableCell>
                
                <Fab variant="extended"  className="subbtn" >
                  <form onClick={handleclick}>
                    <input type='hidden' name="specificpost" onChange={nothing}  value={post.postid}/>
                  
                        <button className="subbtn" type="submit"><pre>  View  </pre></button>
                       
                    
                    </form>
                    </Fab>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[6, 10, 15]}
            
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
            
    </div>
  </>
  );
}

export default MTable;