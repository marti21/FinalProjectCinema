const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmMyZWMwZWM4MTQ1YTY5ZTVkOTU5NDkyZWI2MTYxMCIsInN1YiI6IjY0YTNjZGU2OGUyMGM1MDBjYmVjOWJjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_SVjNBswnLNyJABcJsRz_oJsSQvL5-NEbwWLZR9xQ4'
    }
  };

export async function getMoviesNow() {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1', options)

        if(!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();    
        const posters = getPosterImagesFromMovies(data);

        return posters;
    }
    catch(error){
        console.log(error)
    }
}

export async function fetchNowPlayingMovies(lng:string) {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  if (typeof lng !== 'string' || lng.trim() === '') {
    throw new Error('Invalid language parameter');
  }

  try{
      const url = new URL('https://api.themoviedb.org/3/movie/now_playing');
      url.searchParams.append('page', '1');
      url.searchParams.append('language', lng);

      const response = await fetch(url.toString(), options);

      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const posters = getPosterImagesFromMovies(data)

      return [posters, data];
  }
  catch(error){
    console.error('Error fetching now playing movies:', error);
  }
}

export function getPosterImagesFromMovies(data:any){
  const listUrls = [];
  for (let i = 0; i < 7; i++) {
    listUrls.push(data.results[i].poster_path);
  }

  return listUrls;
}