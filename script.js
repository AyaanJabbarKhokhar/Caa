document.getElementById('caaForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const domain = document.getElementById('domain').value.trim();
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '<p>Checking CAA records...</p>';

  try {
    const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=CAA`);
    const data = await response.json();

    let html = `<h3>Result for ${domain}:</h3>`;

    if (!data.Answer || !Array.isArray(data.Answer)) {
      html += `
        <p style="color: #ff0000; font-weight: bold; text-shadow: 0 0 5px #ff0000;">
          ❌ No CAA records found
        </p>
        <p style="color: #ff0000; font-weight: bold; text-shadow: 0 0 5px #ff0000;">
          🚨 Vulnerability Found
        </p>`;
    } else {
      html += `
        <p style="color: #00ff00; font-weight: bold; text-shadow: 0 0 5px #00ff00;">
          ✅ CAA records found
        </p>
        <p style="color: #ff0000; font-weight: bold; text-shadow: 0 0 5px #ff0000;">
          ❌ Vulnerability Not Found
        </p>
        <ul>`;
      data.Answer.forEach(record => {
        html += `<li>${record.data}</li>`;
      });
      html += '</ul>';
    }

    resultDiv.innerHTML = html;

  } catch (err) {
    resultDiv.innerHTML = `<p style="color: #ff4d4f;">Error fetching CAA records: ${err.message}</p>`;
  }
});
