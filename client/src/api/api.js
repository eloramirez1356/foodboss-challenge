export const getMovies = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesAlphabeticallyAsc = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/ascending/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesAlphabeticallyDsc = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/descending/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesByYearAsc = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/ascendingYear/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getMoviesByYearDsc = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/descendingYear/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getShortestMovies = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/shortests/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}

export const getLongestMovies = async (page) => {
	try{
        const resp = await fetch('http://localhost:3001/longests/' + page);
		return resp.json();
	}catch(error){
		throw error;
	}
}
