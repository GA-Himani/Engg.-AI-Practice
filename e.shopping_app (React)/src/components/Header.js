import { Container, Grid } from '@material-ui/core';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import './product.css';

 const Header = () => {

        return (
            <Container>
                <Grid className='header'>
                    <Grid className='menu'>
                        <Grid>
                            <NavLink exact 
                                className='Navigation'
                                activeClassName='active_class'
                                to='/'> 
                                <button className="btn btn-menu">
                                    Home 
                                </button>
                            </NavLink>
                        </Grid>
                        <Grid>
                            <NavLink exact 
                                className='Navigation'
                                activeClassName='active_class'
                                to='/trash'> 
                                <button className="btn btn-menu">
                                    Trash 
                                </button>
                            </NavLink>
                        </Grid>
                        
                    </Grid>
                    
                </Grid>
            </Container>
        )
    
}

export default Header;