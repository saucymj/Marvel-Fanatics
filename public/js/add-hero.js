const addReview = async (event) => {
  event.preventDefault();

  //const hero_id = document.querySelector("hero-id").value();
  const reviewMessage = document.querySelector("#reviewMessage").value();
try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ reviewMessage }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/overview');
    } else {
      alert('We could not add your review, try again in 1 minute.');
    }
  } catch (err) {
    console.log(err)
  }
};


document.querySelector("#reviewForm").addEventListener("click", addReview);
