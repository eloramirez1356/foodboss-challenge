import React, { Component } from 'react';
import Loading from './Loading';
import Table from './Table';
import { getMovies, getMoviesAlphabetically, getMoviesByYear, getMoviesByDuration, getMoviesWithMultipleDirectors} from '../api/api';

/**
 * @author Eloy Ramirez Hernanz
 * Component List: Component that contains the table with the list of movies. This component is open for adding more tables in case of needing it.
 */
class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            /** isLoading determines when the component Loading should appear on the screen */
            isLoading:false,
            /** movies is a part of the state for storing the movies */
            movies: null,
            /** error is a part of the state for storing the error in case there were one */
            error: null,
            /** page is a part of the state for storing the number of the pagination. Initialized with 1 */
            page: 1,
            /** lastCall is a part of the state for storing the last function called and then call it again in case that the user clicks on the next or previous
             * page button.
             */
            lastCall: getMovies,
            /** lastOrder is a part of the state for storing the last order used in the query, and then call it again in case that the user clicks on the next or
             * previous button.
             */
            lastOrder: 'DESC'
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
      
    /**
     * In this part of the lifecycle of the List component, the isLoading part of the state is set to true to show the component Loading, 
     * and then it is called the function getMovies for obtaining the information of the movies before the component is shown. Once obtained the information,
     * the component List dissapears after having change the variable isLoading to false.
     */
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
    
    /**
     * This method is used when the user clicks on the button Next for obtaining the next page of the pagination.
     * @param {event} e 
     */
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

    /**
     * This method is used when the user clicks on the button Prev for obtaining the previous page of the pagination.
     * @param {event} e 
     */

    async handlePrevPage(e){
        e.preventDefault();
        const {page, lastCall, lastOrder} = this.state;
        if(page !== 1){
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

    /**
     * This method is used when the user clicks on the button A-Z which retrieves the movies ordered alphabetically from the database.
     * @param {event} e 
     */
    async handleDataAlphabeticallyAsc(e){
        this.setState({isLoading: true});
        try{
            const moviesAlphabAsc = await getMoviesAlphabetically(1, 'ASC');
            this.setState({movies:moviesAlphabAsc, isLoading: false, page:1, lastCall: getMoviesAlphabetically, lastOrder: 'ASC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    /**
     * Method executed when the user clicks on the button Z-A which retrieves the movies ordered alphabetically reversed.
     * @param {event} e 
     */
    async handleDataAlphabeticallyDesc(e){
        this.setState({isLoading: true});
        try{
            const moviesAlphabDsc = await getMoviesAlphabetically(1, 'DESC');
            this.setState({movies:moviesAlphabDsc, isLoading: false, page:1, lastCall: getMoviesAlphabetically, lastOrder: 'DESC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }
    /**
     * Method executed when the user clicks on the button Newest for obtaining the movies ordered by year, in ascending order.
     * @param {event} e 
     */
    async handleDataByYearAsc(e){
        this.setState({isLoading: true});
        try{
            const moviesAscendingYear = await getMoviesByYear(1, 'ASC');
            this.setState({movies:moviesAscendingYear, isLoading: false, page:1, lastCall: getMoviesByYear, lastOrder: 'ASC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }
    /**
     * Method executed when the user clicks on the button Oldest for obtaining the movies ordered by year, in descending order.
     * @param {event} e 
     */
    async handleDataByYearDsc(e){
        this.setState({isLoading: true});
        try{
            const moviesDescendingYear = await getMoviesByYear(1, 'DESC');
            this.setState({movies:moviesDescendingYear, isLoading: false, page:1, lastCall: getMoviesByYear, lastOrder: 'DESC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    /**
     * Method executed when the user clicks on the button Longest for obtaining the movies ordered by year, in ascending order.
     * @param {event} e 
     */
    async handleDataByLongestDuration(e){
        this.setState({isLoading: true});
        try{
            const longestMovies = await getMoviesByDuration(1, 'DESC');
            this.setState({movies:longestMovies, isLoading: false, page:1, lastCall: getMoviesByDuration, lastOrder: 'DESC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    /**
     * Method executed when the user clicks on the button Shortest for obtaining the movies ordered by duration, in descending order.
     * @param {event} e 
     */
    async handleDataByShortestDuration(e){
        this.setState({isLoading: true});
        try{
            const shortestMovies = await getMoviesByDuration(1, 'ASC');
            this.setState({movies:shortestMovies, isLoading: false, page:1, lastCall: getMoviesByDuration, lastOrder: 'ASC'});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    /**
     * Method executed when the user clicks on the button Multiple Directors for obtaining the movies with more than one director.
     * @param {event} e 
     */
    async handleDataByMultipleDirectors(e){
        this.setState({isLoading: true});
        try{
            const moviesWithMultipleDirectors = await getMoviesWithMultipleDirectors(1);
            this.setState({movies:moviesWithMultipleDirectors, isLoading: false, page:1, lastCall: getMoviesWithMultipleDirectors});
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    /**
     * Method executed when the user clicks on the button No filters,  for obtaining the movies without filters.
     * @param {event} e 
     */
    async handleDataWithoutFilters(e){
        this.setState({isLoading: true});
        try{
            const moviesWithoutFilter = await getMovies(1);
            this.setState({movies:moviesWithoutFilter, isLoading: false, page:1, lastCall: getMovies });
        }catch(error){
            this.setState({error, isLoading: false});
        }
    }

    render(){
        const {movies, isLoading, error, page} = this.state;
        if(error){
            return (<div> ERROR </div>);
        }
        {/** In case that the state component isLoading is true, the component Loading is shown */}
        if(isLoading) return (<Loading message="Loading Movies..."/>);
        {/** In case that isLoasing was false, the component Table is shown once it has been received the data from the server. This component has
            different properties for passing information from component List to component Table. Concretely the data regarding to the movies and the functions
            for clicking the buttons
         */}
        return (<React.Fragment>
            <div className="container">
                {movies ? <Table dataMovies={movies} page={page} nextPage={this.handleNextPage} prevPage={this.handlePrevPage} 
                alfAsc={this.handleDataAlphabeticallyAsc} alfDsc={this.handleDataAlphabeticallyDesc} yearAsc={this.handleDataByYearAsc} yearDsc={this.handleDataByYearDsc}
                longstDuration={this.handleDataByLongestDuration} shortstDuration={this.handleDataByShortestDuration} noFilter={this.handleDataWithoutFilters}
                multipleDirectors={this.handleDataByMultipleDirectors}></Table> : null}
            </div>
        </React.Fragment>);
    }
}
export default List;