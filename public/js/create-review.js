const addReview = async (event) => {
  event.preventDefault();

 const hero_name = document.querySelector("#name").value.trim();
  const reviewMessage = document.querySelector("#reviewMessage").value.trim();
  console.log(reviewMessage);

try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ reviewMessage, hero_name}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/reviews');
    } else {
      alert('We could not add your review, try again in 1 minute.');
    }
  } catch (err) {
    console.log(err)
  }
};


document.querySelector("#postButton").addEventListener("click", addReview);
