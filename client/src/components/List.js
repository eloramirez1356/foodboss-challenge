import React, { Component } from 'react';
import Loading from './Loading';
//import Header from './Header';
import Table from './Table';
import { getMovies, getMoviesAlphabetically, getMoviesByYear, getMoviesByDuration, getMoviesWithMultipleDirectors} from '../api/api';


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
            newests: false,
            lastCall: getMovies,
            lasOrder: 'DESC',
            multipleDirectors: false
        };
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleDataAlphabeticallyAsc = this.handleDataAlphabeticallyAsc.bind(this);
        this.handleDataAlphabeticallyDesc = this.handleDataAlphabeticallyDesc.bind(this);
        this.handleDataByYearAsc = this.handleDataByYearAsc.bind(this);
        this.handleDataByYearDsc = this.handleDataByYearDsc.bind(this);
        this.handleDataByLongestDuration = this.handleDataByLongestDuration.bind(this);
        this.handleDataByShortestDuration = this.handleDataByShortestDuration.bind(this);
        this.handleDataWithoutFilters = this.handleDataWithoutFilters.bind(this);
        this.handleDataByMultipleDirectors = this.handleDataByMultipleDirectors.bind(this);
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
        const {page, lastCall, lastOrder} = this.state;
        this.setState({isLoading: true});
        try{
            const movies = await lastCall(page+1, lastOrder);
            this.setState({movies, isLoading: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
        this.setState({page: page + 1});
    }

    async handlePrevPage(e){
        e.preventDefault();
        const {page, lastCall, lastOrder} = this.state;
        if(page != 1){
            this.setState({isLoading: true});
            try{
                const movies = await lastCall(page-1, lastOrder);
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
            const moviesAlphabAsc = await getMoviesAlphabetically(1, 'ASC');
            this.setState({movies:moviesAlphabAsc, isLoading: false, page:1, ascendingAlfabetically:true, lastCall: getMoviesAlphabetically, lastOrder: 'ASC', multipleDirectors: false, longestDuration: false, newest:false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataAlphabeticallyDesc(e){
        this.setState({isLoading: true});
        try{
            const moviesAlphabDsc = await getMoviesAlphabetically(1, 'DESC');
            this.setState({movies:moviesAlphabDsc, isLoading: false, page:1, ascendingAlfabetically:false, lastCall: getMoviesAlphabetically, lastOrder: 'DESC', multipleDirectors: false, longestDuration: false, newest:false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByYearAsc(e){
        this.setState({isLoading: true});
        try{
            const moviesAscendingYear = await getMoviesByYear(1, 'ASC');
            this.setState({movies:moviesAscendingYear, isLoading: false, page:1, newests:false, lastCall: getMoviesByYear, lastOrder: 'ASC', multipleDirectors: false, longestDuration: false, ascendingAlfabetically: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByYearDsc(e){
        this.setState({isLoading: true});
        try{
            const moviesDescendingYear = await getMoviesByYear(1, 'DESC');
            this.setState({movies:moviesDescendingYear, isLoading: false, page:1, newests:true, lastCall: getMoviesByYear, lastOrder: 'DESC',  multipleDirectors: false, longestDuration: false, ascendingAlfabetically: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByLongestDuration(e){
        this.setState({isLoading: true});
        try{
            const longestMovies = await getMoviesByDuration(1, 'DESC');
            this.setState({movies:longestMovies, isLoading: false, page:1, longestDuration:true, lastCall: getMoviesByDuration, lastOrder: 'DESC',  multipleDirectors: false, newest: false, ascendingAlfabetically: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByShortestDuration(e){
        this.setState({isLoading: true});
        try{
            const shortestMovies = await getMoviesByDuration(1, 'ASC');
            this.setState({movies:shortestMovies, isLoading: false, page:1, longestDuration:false, lastCall: getMoviesByDuration, lastOrder: 'ASC', multipleDirectors: false, newest: false, ascendingAlfabetically: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataByMultipleDirectors(e){
        this.setState({isLoading: true});
        try{
            const moviesWithMultipleDirectors = await getMoviesWithMultipleDirectors(1);
            this.setState({movies:moviesWithMultipleDirectors, isLoading: false, page:1, lastCall: getMoviesWithMultipleDirectors, multipleDirectors: true, longestDuration: false, newest: false, ascendingAlfabetically: false});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    async handleDataWithoutFilters(e){
        this.setState({isLoading: true});
        try{
            const moviesWithoutFilter = await getMovies(1);
            this.setState({movies:moviesWithoutFilter, isLoading: false, page:1, lastCall: getMovies, multipleDirectors: false, longestDuration: false, newest:false, ascendingAlfabetically:false });
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }


    render(){
        const {movies, isLoading, error, page, ascendingAlfabetically, longestDuration, newests, multipleDirectors} = this.state;
        if(error){
            return (<div> ERROR </div>);
        }
        if(isLoading) return (<Loading message="Loading Movies..."/>);
        return (<React.Fragment>
            <div className="container">
                {movies ? <Table dataMovies={movies} page={page} nextPage={this.handleNextPage} prevPage={this.handlePrevPage} 
                alfAsc={this.handleDataAlphabeticallyAsc} alfDsc={this.handleDataAlphabeticallyDesc} yearAsc={this.handleDataByYearAsc} yearDsc={this.handleDataByYearDsc}
                longstDuration={this.handleDataByLongestDuration} shortstDuration={this.handleDataByShortestDuration} noFilter={this.handleDataWithoutFilters}
                multipleDirectors={this.handleDataByMultipleDirectors}
                isOrderedAsc={ascendingAlfabetically} isLongestDuration={longestDuration} isNewest={newests} hasMultipleDirectors={multipleDirectors}></Table> : null}
            </div>
        </React.Fragment>);
    }
}
export default List;