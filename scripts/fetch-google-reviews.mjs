const key = 'AIzaSyBoYjeRtfVI0Jd8Q_9mnflo9i4sOYpShB0';
const queries = [
  'Estudio Juridico de Familia Internacional familiainternacional.cl',
  'Familia Internacional abogados Chile',
];

for (const query of queries) {
  const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,rating,user_ratings_total&key=${key}`;
  const findRes = await fetch(findUrl);
  const findJson = await findRes.json();
  console.log('\nfind', query, findJson);

  const placeId = findJson.candidates?.[0]?.place_id;
  if (!placeId) continue;

  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&reviews_sort=newest&key=${key}`;
  const detailsRes = await fetch(detailsUrl);
  const detailsJson = await detailsRes.json();
  console.log('details status', detailsJson.status);
  if (detailsJson.result?.reviews) {
    for (const review of detailsJson.result.reviews) {
      console.log({
        author: review.author_name,
        photo: review.profile_photo_url,
        rating: review.rating,
        text: review.text?.slice(0, 120),
      });
    }
  } else {
    console.log(detailsJson);
  }
}
