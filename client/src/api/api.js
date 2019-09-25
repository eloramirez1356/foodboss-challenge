export const getMovies = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesAlphabetically = async (page, order='DESC') => {
	try{
        const resp = await fetch('http://localhost:3001/alphabetically/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesByYear = async (page, order) => {
	try{
        const resp = await fetch('http://localhost:3001/year/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesByDuration = async (page, order) => {
	try{
        const resp = await fetch('http://localhost:3001/duration/' + page + '/' + order);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesWithMultipleDirectors = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/multipleDirectors/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}