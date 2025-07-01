document.getElementById('caaForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const domain = document.getElementById('domain').value;
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '<p>Checking CAA records...</p>';

  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=CAA`);
    const data = await response.json();

    if (!data.Answer) {
      resultDiv.innerHTML = `<div class="vuln">Vulnerability Found<br>No CAA records found.</div>`;
    } else {
      let html = `<div class="safe">Vulnerability Not Found<br>CAA records found:</div><ul>`;
      data.Answer.forEach(record => {
        html += `<li>${record.data}</li>`;
      });
      html += '</ul>';
      resultDiv.innerHTML = html;
    }
  } catch (err) {
    resultDiv.innerHTML = `<div class="vuln">Error: ${err.message}</div>`;
  }
});
