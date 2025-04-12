export async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/ProsusAI/finbert",
    {
      headers: {
        Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxx",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

/* query({ inputs: "I like you. I love you" }).then((response) => {
    console.log(JSON.stringify(response));
}); */
