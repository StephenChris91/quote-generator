const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const twitter = document.querySelector('.twitter-button');
const newQuote = document.querySelector('#new-quote');
const authorText = document.querySelector('#author');
const loader = document.querySelector('#loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
async function getQuote(){

    loading();

    let proxy = `https://cors-anywhere.herokuapp.com/`

    let apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"

   try {
    const response = await fetch(apiUrl, {
        headers: {
            'Access-Control-Allow-Origin': 'https://stephenchris91.github.io/quote-generator/'
        }
    });
    const data = await response.json()
          console.log(data);
          if (data.quoteAuthor === ''){
              data.quoteAuthor = 'Unknown'
          }else{

              quoteText.innerText = data.quoteText;
              authorText.innerText = data.quoteAuthor;
          }

          //Reduce length of quote

          if (data.quoteText.length > 120){
              quoteText.classList.add('long-quote')
          }else{
              quoteText.classList.remove('long-quote');
          }

        //stop loading and show quote
          complete()

   } catch (error) {
       console.log('no data ', error)
   }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(tweetURL, '_blank');
}

newQuote.addEventListener('click', getQuote);
twitter.addEventListener('click', tweetQuote);


//onLoad 
getQuote();
