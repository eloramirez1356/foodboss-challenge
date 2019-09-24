import React, { Component } from 'react';
import Loading from './Loading';
//import Header from './Header';
import Table from './Table';

import { getMovies, getMoviesAlphabeticallyAsc, getMoviesAlphabeticallyDsc, getMoviesByYearAsc, getMoviesByYearDsc, getLongestMovies, getShortestMovies} from '../api/api';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            movies: null,
            error: null,
            page: 1,
            ascendingAlfabetically:false,
            longestDuration: false,
            newests: false
        };
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleDataAlphabeticallyAsc = this.handleDataAlphabeticallyAsc.bind(this);
        this.handleDataAlphabeticallyDesc = this.handleDataAlphabeticallyDesc.bind(this);
        this.handleDataByYearAsc = this.handleDataByYearAsc.bind(this);
        this.handleDataByYearDsc = this.handleDataByYearDsc.bind(this);
        this.handleDataByLongestDuration = this.handleDataByLongestDuration.bind(this);
        this.handleDataByShortestDuration = this.handleDataByShortestDuration.bind(this);
    }
      
    async componentDidMount(){
        const {page} = this.state;
        this.setState({isLoading: true});
        try{
            const movies = await getMovies(page);
            this.setState({movies, isLoading: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }
    

    async handleNextPage(e){
        e.preventDefault();
        const {page} = this.state;
        this.setState({isLoading: true});
        try{
            const movies = await getMovies(page+1);
            this.setState({movies, isLoading: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
        this.setState({page: page + 1});
    }

    async handlePrevPage(e){
        e.preventDefault();
        const {page} = this.state;
        if(page != 1){
            this.setState({isLoading: true});
            try{
                const movies = await getMovies(page-1);
                this.setState({movies, isLoading: false});
            }catch(error){
                this.setState({error, isLoading: false});
            }
            this.setState({page: page - 1});
        }
        
    }

    async handleDataAlphabeticallyAsc(e){
        this.setState({isLoading: true});
        try{
            const moviesAlphabAsc = await getMoviesAlphabeticallyAsc(1);
            this.setState({movies:moviesAlphabAsc, isLoading: false, page:1, ascendingAlfabetically:true});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataAlphabeticallyDesc(e){
        this.setState({isLoading: true});
        try{
            const moviesAlphabDsc = await getMoviesAlphabeticallyDsc(1);
            this.setState({movies:moviesAlphabDsc, isLoading: false, page:1, ascendingAlfabetically:false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByYearAsc(e){
        this.setState({isLoading: true});
        try{
            const moviesAscendingYear = await getMoviesByYearAsc(1);
            this.setState({movies:moviesAscendingYear, isLoading: false, page:1, newests:false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByYearDsc(e){
        this.setState({isLoading: true});
        try{
            const moviesDescendingYear = await getMoviesByYearDsc(1);
            this.setState({movies:moviesDescendingYear, isLoading: false, page:1, newests:true});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByLongestDuration(e){
        this.setState({isLoading: true});
        try{
            const longestMovies = await getLongestMovies(1);
            this.setState({movies:longestMovies, isLoading: false, page:1, longestDuration:true});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByShortestDuration(e){
        this.setState({isLoading: true});
        try{
            const shortestMovies = await getShortestMovies(1);
            this.setState({movies:shortestMovies, isLoading: false, page:1, longestDuration:false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    render(){
        const {movies, isLoading, error, page, ascendingAlfabetically, longestDuration, newests} = this.state;
        if(error){
            return (<div> ERROR </div>);
        }
        if(isLoading) return (<Loading message="Loading Movies..."/>);
        return (<React.Fragment>
            <div className="container">
                {movies ? <Table dataMovies={movies} page={page} nextPage={this.handleNextPage} prevPage={this.handlePrevPage} 
                alfAsc={this.handleDataAlphabeticallyAsc} alfDsc={this.handleDataAlphabeticallyDesc} yearAsc={this.handleDataByYearAsc} yearDsc={this.handleDataByYearDsc}
                longstDuration={this.handleDataByLongestDuration} shortstDuration={this.handleDataByShortestDuration}
                isOrderedAsc={ascendingAlfabetically} isLongestDuration={longestDuration} isNewest={newests}></Table> : null}
            </div>
        </React.Fragment>);
    }
}
export default List;