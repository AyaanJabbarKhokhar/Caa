
document.getElementById('caaForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const domain = document.getElementById('domain').value;
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '<p>Checking CAA records...</p>';

  try {
    const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=CAA`);
    const data = await response.json();

    if (!data.Answer) {
      resultDiv.innerHTML = '<p style="color: red; font-size: 1.2rem;"><strong>No CAA records found.</strong></p>';
    } else {
      let html = '<p style="color: green; font-size: 1.2rem;"><strong>CAA records found:</strong></p><ul>';
      data.Answer.forEach(record => {
        html += '<li>' + record.data + '</li>';
      });
      html += '</ul>';
      resultDiv.innerHTML = html;
    }
  } catch (err) {
    resultDiv.innerHTML = '<p style="color: red;">Error: ' + err.message + '</p>';
  }
});
